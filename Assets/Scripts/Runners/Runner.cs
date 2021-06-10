using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class Runner : MonoBehaviour
{
    public NavMeshAgent agent;
    public GameObject destPrefab;

    private string DestinationTag = "RunnerDestination";

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
    void OnTriggerEnter(Collider other)
    {
        if (other.tag == "SearchBeam")
        {
            Debug.Log("Runner Has Been Found");
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

}
