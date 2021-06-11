using System.Collections;
using System.Collections.Generic;
using UnityEngine.AI;
using UnityEngine;

public class Friend : MonoBehaviour
{
    private GameObject Digit;
    private NavMeshAgent nav;
    private bool following = false;

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

}
