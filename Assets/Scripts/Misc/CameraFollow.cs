using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    public GameObject runner;

    void Update()
    {
        transform.LookAt(runner.transform);
    }
}
