using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraController : MonoBehaviour
{
    public GameObject runner;
    private Vector3 offset;

    void Start()
    {
        offset = transform.position - runner.transform.position;
    }

    void LateUpdate()
    {
        transform.position = runner.transform.position + offset;
    }

    /* We need to provide a way to rotate the camera. This is more annoying than I would have expected, but
     * the solution is likely just sitting down and learning more about Quarternions and Euler Angles.
    */
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.A))
        {
            transform.Rotate(Vector3.up, 15.0f);
        }

        if (Input.GetKeyDown(KeyCode.S))
        {
            transform.Rotate(new Vector3(0.0f, -1.0f, 0.0f));
        }
    }
}
