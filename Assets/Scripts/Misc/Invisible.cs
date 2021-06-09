using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Invisible : MonoBehaviour
{

    void Start()
    {
        MeshRenderer mesh = GetComponentInChildren<MeshRenderer>();
        if (mesh != null)
        {
            mesh.enabled = false;
        }
    }

}
