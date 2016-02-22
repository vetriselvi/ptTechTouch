    /********************************************************
     * This is the actual example part where we call grabStrength
     *****************************************************/
     $(window).click(function() {
        switchScreen()
    });

     $( document ).ready(function() {

      if(!window.location.href.includes("data")) {
              output = document.getElementById('output')
              progress = document.getElementById('progress');   
                  visualizeHand(Leap.loopController);

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );


        // creates cube and places in scene
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );      
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff99 } );
        cube = new THREE.Mesh( geometry, material );
        scene.add(cube);
        cube.position = new THREE.Vector3(xPos, yPos, 0)

        camera.position.z = 5;  // so that cube and camera do not overlap
                render();
      }
     });

    var buttonDidRender = false;
    var output;
    var progress;
    var cube;
    var renderer;
    var scene;
    var camera;
    var interval = 2000; //ms
    var previousMillis = 0;
    var counter = 0;    // keep track of reps
    var xPos = 0;       // global variables to keep track of cube location
    var yPos = 0;
    var previousFrame = null;
    var paused = false;
    var pauseOnGesture = false;
    var palmRot = [];
    var handGrasp = [];    // Bar

    // Set up the controller:
    Leap.loop({background: true}, {

        hand: function(hand){
              // var startTimeFromRails = parseInt(document.getElementById("beforetime").innerText);
              // var currTimeFromRails = parseInt(document.getElementById("currtime").innerText) - startTimeFromRails;
              // var prevTimeFromRails = parseInt(document.getElementById("prevtime").innerText) - startTimeFromRails;
              // console.log(currTimeFromRails)
              // console.log(prevTimeFromRails)
              // var handDiff = handGrasp[currTimeFromRails]-handGrasp[prevTimeFromRails]
              // var rotDiff = palmRot[currTimeFromRails]-palmRot[prevTimeFromRails]
              // console.log(handDiff);
              // console.log(rotDiff)

                  output.innerHTML = hand.grabStrength.toPrecision(2);
                  progress.style.width = hand.grabStrength * 100 + '%';
                //         handGrasp.push(hand.grabStrength)
                // palmRot.push(hand.rotationAxis(previousFrame, 2))

                var d = new Date();
                var currentMillis = d.getTime();
                if (currentMillis - previousMillis >= interval) {
                  if (hand.grabStrength.toPrecision(3) >= 0.7) {
                    previousMillis = currentMillis;
                    changePosition(); 
                  }
                }

                 if (counter == 4) {
                    scene.remove(cube);
                    if(buttonDidRender == false) {
                      var text2 = document.getElementById('button')
                      text2.style.display = 'block'
                      buttonDidRender = true
                      setTimeout(function(){text2.innerHTML = "Click here to continue"}, 5000); 
                    }
                }
              }
    });



    /*********************************************************
     * The rest of the code is here for visualizing the example. Feel
     * free to remove it to experiment with the API value only
     ****************************************************/

    // Adds the rigged hand and playback plugins
    // to a given controller, providing a cool demo.
    visualizeHand = function(controller){
        // The leap-plugin file included above gives us a number of plugins out of the box
        // To use a plugins, we call `.use` on the controller with options for the plugin.
        // See js.leapmotion.com/plugins for more info

        controller.use('playback', {
            // This is a compressed JSON file of preprecorded frame data
            //recording: 'grab-bones-7-54fps.json.lz',
            // How long, in ms, between repeating the recording.
            timeBetweenLoops: 1000,
            pauseOnHand: true
        }).on('riggedHand.meshAdded', function(handMesh, leapHand){
            handMesh.material.opacity = 1;
        });

        var overlay = controller.plugins.playback.player.overlay;
        overlay.style.right = 0;
        overlay.style.left = 'auto';
        overlay.style.top = 'auto';
        overlay.style.padding = 0;
        overlay.style.bottom = '13px';
        overlay.style.width = '180px';


        controller.use('riggedHand', {
            scale: 1.3,
            boneColors: function (boneMesh, leapHand){
                if ((boneMesh.name.indexOf('Finger_') == 0) ) {
                    return {
                        hue: 0.564,
            saturation: leapHand.grabStrength,
            lightness: 0.5
                    }
                }
            }
        });

        var camera = controller.plugins.riggedHand.camera;
        camera.position.set(0,20,-25);
        camera.lookAt(new THREE.Vector3(0,3,0));
    };

      var render = function () {
        requestAnimationFrame( render );

        cube.rotation.x += 0.0000001;
        cube.rotation.y += 0.1;
        cube.rotation.z += 0.1;
        cube.position = new THREE.Vector3(xPos, yPos, 0)

        renderer.render(scene, camera);
      };

  var previousMillis = 0; 
  function changePosition() {
          xPos = (Math.random()-0.5)*5;
          yPos = -1 + (Math.random()-0.5)*5;
          counter++; 
  }


function switchScreen() {
        $.ajax({ 
            type: 'GET', 
            url: '/muses/data',  
            async: true,
            success: function(response){
                history.pushState(null, "", '/muses/data')
                location.reload();
            }
        });
}


