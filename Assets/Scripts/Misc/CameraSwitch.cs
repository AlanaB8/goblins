using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraSwitch : MonoBehaviour
{
    public GameObject North;
    public GameObject South;
    public GameObject East;
    public GameObject West;

    void Start()
    {
        South.SetActive(true);
        North.SetActive(false);
        East.SetActive(false);
        West.SetActive(false);
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.A))
        {
            North.SetActive(false);
            South.SetActive(false);
            East.SetActive(false);
            West.SetActive(true);
        }

        if (Input.GetKeyDown(KeyCode.W))
        {
            North.SetActive(true);
            South.SetActive(false);
            East.SetActive(false);
            West.SetActive(false);
        }

        if (Input.GetKeyDown(KeyCode.D))
        {
            North.SetActive(false);
            South.SetActive(false);
            East.SetActive(true);
            West.SetActive(false);
        }

        if (Input.GetKeyDown(KeyCode.S))
        {
            North.SetActive(false);
            South.SetActive(true);
            East.SetActive(false);
            West.SetActive(false);
        }
    }
}
