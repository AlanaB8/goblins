//------------------ REST TEST------------------ REST TEST------------------ REST TEST------------------ REST TEST------------------ REST TEST


    /* when including ArcGIS REST JS all exports are available
    from the same arcgisRest global */

    const apiKey = "AAPKb40cbeb34328430da59e394ca9aa1093cO3mnRFhUO_fclB1uhTEYLxEWvgVKHRtnMdO9ct1aMbj76IMGKQG8XErc4ul1zTd";
    const authentication = new arcgisRest.ApiKey({
      key: apiKey
    });

    const theUrl = "https://services1.arcgis.com/BteRGjYsGtVEXzaX/arcgis/rest/services/Friend_Information/FeatureServer/0";

    function queryFts () {
        arcgisRest.queryFeatures({
            url: theUrl,
            where: "friend_name = null",
            authentication
        })
        .then(response => {
            console.log("resp")
        //     console.log(response.features);

        // // delete the feature using the objectId of the updated feature
        // // NOTE: it is the same objectId provided in the response of `arcgisRest.addFeatures`
        //     const featureToDelete = [response.features];

        //     arcgisRest.deleteFeatures({
        //         url: theUrl,
        //         objectIds: [featureToDelete],
        //         authentication
        //     })
        //     .then(handleDeleted);
        })
    }

// const playing_gob = {
//       attributes: {
//         friend_name: 'ET',
//         pos_x: '2',
//         pos_y: '1'
//       },
//     };

//     queryFts();

//     // begin by adding a new feature to the feature service layer,
//     // then update its attributes,
//     // and finally delete it from the layer
//     arcgisRest.addFeatures({
//       url: theUrl,
//       features: [playing_gob],
//       authentication
//     })
//       .then(handleAdded);

//     function handleAdded(response) {
//       console.log(response);
//       queryFts();
      

//       if (!response.addResults[0].success) {
//         // stop early if adding a new feature was not successful
//         return;
//       }

//       // perform an update to feature attributes using the objectId of the newly added feature
//       const featureToUpdate = {
//         attributes: {
//           objectId: response.addResults[0].objectId,
//           name: 'Eddie',
//           pos_x: '2',
//           pos_y: '3'
//         }
//       };

//       arcgisRest.updateFeatures({
//         url: theUrl,
//         features: [featureToUpdate],
//         authentication
//       })
//         .then(handleUpdated);
//     }

//     function handleUpdated(response) {
//       console.log(response);
//       queryFts();

//       if (!response.updateResults[0].success) {
//         // stop early if updating the feature was not successful
//         return;
//       }

 

    function handleDeleted(response) {
      console.log(response);

      if (!response.deleteResults[0].success) {
        // stop early if updating the feature was not successful
        return;
      }
    }