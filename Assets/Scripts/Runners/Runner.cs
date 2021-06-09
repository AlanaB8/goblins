using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class Runner : MonoBehaviour
{
    public Camera cam;
    public NavMeshAgent agent;
    public GameObject destPrefab;

    private string DestinationTag = "RunnerDestination";

    // Check For user Input, move NavMeshAgent, and update visual cues.
    void Update()
    {
        // https://docs.unity3d.com/Manual/nav-MoveToClickPoint.html
        if (Input.GetMouseButtonDown(0))
        {
            Ray ray = cam.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;

            if (Physics.Raycast(ray, out hit))
            {
                /*
                 * Understanding how to avoid/improve this If condition will be important. 
                 * At the moment, ignoring input that intersects with the SearchBeam of the Enemies
                 * results in a poor experience for the player. We need to come up with some feedback or
                 * show their cursor moving around and providing more visual cues for when they are 
                 * allowed to make a game movement.
                 */
                if (hit.collider.tag != "SearchBeam")
                {
                    agent.SetDestination(hit.point);

                    RemoveExistingDestination();

                    CreateDestinationMarker(hit);
                }
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
    void OnTriggerEnter(Collider other)
    {
        if (other.tag == "SearchBeam")
        {
            Debug.Log("Runner Has Been Found");
            Application.Quit();
        }
    }

}
