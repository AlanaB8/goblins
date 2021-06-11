using System.Collections;
using System.Collections.Generic;
using UnityEngine.AI;
using UnityEngine;

public class Friend : MonoBehaviour
{
    public GameObject Runner;

    private NavMeshAgent nav;
    private bool following = false;

    void Start()
    {
        // Attempting to make the group appear more natural; i.e. not all Friends in a straight line behind the Runner.
        nav = GetComponent<NavMeshAgent>();
        nav.stoppingDistance = Random.Range(3.0f, 6.0f);

        // TODO - Fetch Digit & Assign
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
            // Another attempt to make the group appear more natural.
            //float offsetX = Runner.transform.position.x + Random.Range(2.0f, 4.0f);
            //float offsetZ = Runner.transform.position.z + Random.Range(2.0f, 4.0f);
            //nav.SetDestination(new Vector3(offsetX, Runner.transform.position.y, offsetZ));

            nav.SetDestination(Runner.transform.position);
        }
    }

}
