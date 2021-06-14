using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net.Http;

using UnityEngine;

using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

public class FriendFetch : MonoBehaviour
{
    public GameObject friendPrefab;

    HttpClient client = new HttpClient();
    List<string> friends = new List<string>();
    string serviceURL = "https://services1.arcgis.com/BteRGjYsGtVEXzaX/arcgis/rest/services/Friend_Information/FeatureServer/0";

    async void FixedUpdate()
    {
        await FetchFriends();
    }

    private async Task FetchFriends()
    {
        IEnumerable<KeyValuePair<string, string>> queries = new List<KeyValuePair<string, string>>()
        {
            new KeyValuePair<string, string>("where", "1=1"),
            new KeyValuePair<string, string>("outFields", "*"),
            new KeyValuePair<string, string>("f", "json")
        };

        HttpContent content = new FormUrlEncodedContent(queries);
        HttpResponseMessage resp = await client.PostAsync($"{serviceURL}/query", content);

        resp.EnsureSuccessStatusCode();

        string respBody = await resp.Content.ReadAsStringAsync();
        var results = JObject.Parse(respBody);
        if (results == null)
		{
            return;
		}
        var features = results["features"].Children();

        foreach (var f in features)
        {
            var attributes = f.SelectToken("attributes");
            var name = attributes.SelectToken("friend_name").ToString();
            float pos_x = 0.0f;
            float.TryParse(attributes.SelectToken("pos_x").ToString(), out pos_x);
            float pos_y = 0.0f;
            float.TryParse(attributes.SelectToken("pos_y").ToString(), out pos_y);
            float pos_z = 0.0f;
            float.TryParse(attributes.SelectToken("pos_z").ToString(), out pos_z);

            if (!DoesFriendExist(name))
            {
                BuildFriend(name, pos_x, pos_y, pos_z);
            }

        }
    }

    private bool DoesFriendExist(string targetName)
    {
        foreach (var friendName in friends)
        {
            if (friendName == targetName)
            {
                return true;
            }
        }

        return false;
    }

    private void BuildFriend(string name, float x, float y, float z)
    {
        var newFriend = Instantiate(friendPrefab, new Vector3(0, 0, 0), Quaternion.identity);

        newFriend.transform.position = new Vector3(x, y, z);
        newFriend.name = name;

        friends.Add(name);
    }
}
