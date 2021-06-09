using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class Drone : MonoBehaviour
{
    private Vector3 startingPosition;
    private List<Vector3> locations = new List<Vector3>();
    private int currentLocation = 0;


    void Start()
    {
        Vector3 startingPosition = transform.position;

        /*/
         * Generate 4 random locations for the Drone to patrol. 4 should likely be a public short
         * that can be configured via the Inspector with a default of 4. Also, there is a world where just
         * defining the patrol locations and then passing them to this Drone is a better approach. 
         */
        for (int i = 0; i < 4; i++)
        {
            Vector3 patrolLocation = UnityEngine.Random.insideUnitSphere * 15;
            patrolLocation += startingPosition;
            locations.Add(patrolLocation);
        }
    }

    void LateUpdate()
    {
        Patrol();
    }

    // Cycle the Drone over a series of locations in the game. 
    void Patrol()
    {
        transform.position = Vector3.MoveTowards(transform.position, locations[currentLocation], 0.05f);

        if (Vector3.Distance(transform.position, locations[currentLocation]) < 0.001f)
        {
            currentLocation += 1;

            if (currentLocation >= locations.Count)
            {
                currentLocation = 0;
            }
        }
    }

}
