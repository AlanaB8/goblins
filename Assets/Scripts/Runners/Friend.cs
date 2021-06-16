using System.Collections;
using System.Collections.Generic;
using UnityEngine.AI;
using UnityEngine;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Net.Http;

public class Friend : MonoBehaviour
{
    private GameObject Digit;
    private NavMeshAgent nav;
    private bool following = false;

    HttpClient client = new HttpClient();
    string serviceURL = "https://services1.arcgis.com/BteRGjYsGtVEXzaX/arcgis/rest/services/Friend_Information/FeatureServer/0";

    void Start()
    {
        nav = GetComponent<NavMeshAgent>();
        Digit = GameObject.Find("Digit");
    }

    void OnTriggerEnter(Collider other)
    {
        if (other.tag == "Runner")
        {
            following = true;
        }

        // End the game if Friend has been found by a Drone.
        if (other.tag == "SearchBeam")
        {
            Debug.Log("Friend Has Been Found!");
            Application.Quit();
        }
    }

    void Update()
    {
        if (following)
        {
            nav.SetDestination(Digit.transform.position);
        }
    }

    async void LateUpdate()
    {
        await UpdatePositionToFS();
    }

    async Task UpdatePositionToFS()
    {
        var attributes = new JObject();
        var objectId = 0;
        switch (this.name)
		{
            case "Lucy": objectId = 1;
                break;
            case "Gaz": objectId = 2;
                break;
		}
        attributes.Add("OBJECTID", objectId);
        attributes.Add("pos_x", this.transform.position.x);
        attributes.Add("pos_y", this.transform.position.y);
        attributes.Add("pos_z", this.transform.position.z);

        var obj = new JObject();
        obj.Add("attributes", attributes);

        JArray adds = new JArray(obj);
        string addsString = JsonConvert.SerializeObject(adds);

        IEnumerable<KeyValuePair<string, string>> payload = new List<KeyValuePair<string, string>>()
        {
            new KeyValuePair<string, string>("updates", addsString),
            new KeyValuePair<string, string>("f", "json")
        };
        HttpContent content = new FormUrlEncodedContent(payload);

        HttpResponseMessage resp = await client.PostAsync($"{serviceURL}/applyEdits", content);
        resp.EnsureSuccessStatusCode();
        string respBody = await resp.Content.ReadAsStringAsync();
        var results = JObject.Parse(respBody);
        Debug.Log(respBody);
    }

}
