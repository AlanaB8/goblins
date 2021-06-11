using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

using System.Threading.Tasks;
using System.Net.Http;

using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

public class Runner : MonoBehaviour
{
    public NavMeshAgent agent;
    public GameObject destPrefab;

    private string DestinationTag = "RunnerDestination";

    HttpClient client = new HttpClient();
    string serviceURL = "https://services1.arcgis.com/BteRGjYsGtVEXzaX/arcgis/rest/services/Friend_Information/FeatureServer/0";

    // Check for user Input, move NavMeshAgent, and update visual cues.
    void Update()
    {
        Camera activeCamera = getActiveCamera();

        // https://docs.unity3d.com/Manual/nav-MoveToClickPoint.html
        if (Input.GetMouseButtonDown(0))
        {
            Ray ray = activeCamera.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;

            if (Physics.Raycast(ray, out hit))
            {
                agent.SetDestination(hit.point);
                RemoveExistingDestination();
                CreateDestinationMarker(hit);
            }
        }
    }

    // Give the user a visual cute about where the Runner is going next.
    void CreateDestinationMarker(RaycastHit hit)
    {
        Instantiate(destPrefab, hit.point, Quaternion.identity);
    }

    // Find and delete Prefab made in CreateDestinationMarker.
    void RemoveExistingDestination()
    {
        GameObject dest = GameObject.FindWithTag(DestinationTag);
        Destroy(dest);
    }

    // End the game if the Runner has been found by a Drone. 
    async void OnTriggerEnter(Collider other)
    {
        if (other.tag == "SearchBeam")
        {
            Debug.Log("Runner Has Been Found");
            //await SendGameOver();
            Application.Quit();
        }
    }

    // Return active Camera. Not sure why Camera.current wasn't working originally.
    Camera getActiveCamera()
    {
        foreach(Camera cam in Camera.allCameras)
        {
            if (cam.gameObject.activeInHierarchy)
            {
                return cam;
            }
        }

        return Camera.current;
    }

    async Task SendGameOver()
    {
        Dictionary<string, Dictionary<string, string>> edit = new Dictionary<string, Dictionary<string, string>>
        {
            {
                "attributes",
                new Dictionary<string, string>
                {
                    {"discovered", "True"}
                }
            }
        };


        Debug.Log(JsonConvert.SerializeObject(edit));

        // TODO = HTTP Post to applyEdits

    }

}
