using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraSwitch : MonoBehaviour
{
    public GameObject cameraA;
    public GameObject cameraB;
    public GameObject cameraC;
    public GameObject cameraD;

    void Start()
    {
        cameraA.SetActive(true);
        cameraB.SetActive(false);
        cameraC.SetActive(false);
        cameraD.SetActive(false);
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.A))
        {
            cameraA.SetActive(true);
            cameraB.SetActive(false);
            cameraC.SetActive(false);
            cameraD.SetActive(false);
        }

        if (Input.GetKeyDown(KeyCode.W))
        {
            cameraA.SetActive(false);
            cameraB.SetActive(true);
            cameraC.SetActive(false);
            cameraD.SetActive(false);
        }

        if (Input.GetKeyDown(KeyCode.D))
        {
            cameraA.SetActive(false);
            cameraB.SetActive(false);
            cameraC.SetActive(true);
            cameraD.SetActive(false);
        }

        if (Input.GetKeyDown(KeyCode.S))
        {
            cameraA.SetActive(false);
            cameraB.SetActive(false);
            cameraC.SetActive(false);
            cameraD.SetActive(true);
        }
    }
}
