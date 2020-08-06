// My first experiment with three js
// Code available here : https://github.com/robin-dela/workshop-webgl
// Also visible here with dat Gui : http://robindelaporte.fr/lab

'use strict';

let webgl,
    gui,
    pathSound = 'https://robindelaporte.fr/lab/app/sound/lean.mp3',
    frequencys,
    average,
    treble,
    bass,
    medium,
    isLaunch = 0,
    soundStarted = 0,
    launcher,
    inputFile,

    usePostprocessing,
    toon,
    invert,
    grayscale,
    camera,
    tunnel,
    scene,
    renderer,
    composer,
    toonPass,
    invertPass,
    grayscalePass,

    texture,
    lightGlobal,
    lightTop,
    magicLight
    ;

domready(() => {
  // webgl settings
  webgl = new Webgl(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // GUI settings
  //gui = new dat.GUI();
  //gui.add(webgl, 'usePostprocessing');

  // handle resize
  resizeHandler();

  window.onresize = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    composer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  };

  // Intro scene
  var start = document.getElementById('start');
  var title = document.getElementById('title');
  start.onclick = startXp;
});

function Webgl(height, width) {

    scene = new THREE.Scene();

    // Set up camera
    camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 10000 );
    camera.position.set = (0, 0, 7);
    camera.lookAt(scene.position);
    scene.add(camera);

    // Add fog in the end of the tunnel
    scene.fog = new THREE.FogExp2( 0x000000, 0.15 );

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000);

    // Use post processing to look like toon
    usePostprocessing = true;
    toon = true;
    invert = false;
    grayscale = false;
    composer = new WAGNER.Composer(renderer);
    composer.setSize(width, height);
    initPostprocessing();
    createTunnel();

    // this.dom = this.renderer.domElement;
    // this.controls = new THREE.OrbitControls( this.camera, this.dom );
  
  }

  function createTunnel() {
    // Create tube and add texture
    var geometry  = new THREE.CylinderGeometry( 1, 1, 30, 32, 1, true );
    THREE.ImageUtils.crossOrigin = "";
    texture = THREE.ImageUtils.loadTexture( "https://robindelaporte.fr/lab/build/img/water.jpg" );
    texture.wrapT = THREE.RepeatWrapping;

    var material  = new THREE.MeshLambertMaterial({
      color : 0xFFFFFF,
      map : texture,
      side: THREE.DoubleSide
    });

    var tube  = new THREE.Mesh( geometry, material );
    tube.rotation.x = Math.PI/2;
    tube.flipSided  = true;
    scene.add(tube);

    //Add light in the tube
    lightTop = new THREE.PointLight( 0x009589, 15, 25 );
    lightTop.position.set( 0, -3, 0 );
    scene.add( lightTop );

    // Add light in the tube
    lightGlobal = new THREE.PointLight( 0x00796F, 20, 30 );
    lightGlobal.position.set( 0, 3, 0 );
    scene.add( lightGlobal );

    // Add light in the tube
    magicLight = new THREE.PointLight( 0xe74c3c, 20, 30 );
    magicLight.position.set( 1, 3, 0 );
    scene.add( magicLight );
  }

  function updateTunnel(average, frequencys, treble, bass, medium) {
    var maxIntensity = 35;

    magicLight.intensity = 0;

    texture.offset.y  -= 0.005;
    texture.offset.y  %= 1;
    texture.needsUpdate = true;

    // Modify intensity with average value
    if (average > maxIntensity) {
      lightTop.intensity = average /6;
      lightGlobal.intensity = average /6;
    } else {
      lightTop.intensity = average/3;
      lightGlobal.intensity = average/3;
    }
    if (average > 80) {
      magicLight.intensity = 10;
    }
  }

  function initPostprocessing() {
    if (!usePostprocessing) return;

    // Load Pass
    toonPass = new WAGNER.ToonPass();
    invertPass = new WAGNER.InvertPass();
    grayscalePass = new WAGNER.GrayscalePass();
  }

  function resize(width, height) {
    composer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  function render(average, frequencys, treble, bass, medium) {

    if (usePostprocessing) {
      composer.reset();
      composer.renderer.clear();
      composer.render(scene, camera);

      if (toon) {
        composer.pass(toonPass);
      }
      if (invert) {
        composer.pass(invertPass);
      }
      if (grayscale) {
        composer.pass(grayscalePass)
      }
      composer.toScreen();

      if(treble > 30) {
        invert = true;
      } else {
        invert = false;
      }

      if (bass > 200) {
        grayscale = true;
      } else {
        grayscale = false;
      }

    } else {
      renderer.autoClear = false;
      renderer.clear();
      renderer.render(scene, camera);
    }

    // move camera
    var seconds   = Date.now() / 1000;
    var radius    = 0.70;
    var angle   = Math.sin(0.75 * seconds * Math.PI) / 4;

    //angle = (seconds*Math.PI)/4;
    camera.position.x = Math.cos(angle - Math.PI/2) * radius;
    camera.position.y = Math.sin(angle - Math.PI/2) * radius;
    camera.rotation.z = angle;

    // Update tunnel with audio values
    updateTunnel(average, frequencys, treble, bass, medium);
  }


function startXp() {
  start.classList.add('fade');
  title.classList.add('fade');

  setupAudioNodes();
  loadSound(pathSound);

  // let's play !
  animate();
}

function resizeHandler() {
  resize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render(average, frequencys, treble, bass, medium);
}

// Get sound
if (! window.AudioContext) {
  if (! window.webkitAudioContext) {
      alert('no audiocontext found');
  }
  window.AudioContext = window.webkitAudioContext;
}

let context = new AudioContext(),
    audioBuffer,
    sourceNode = context.createBufferSource(),
    analyser = context.createAnalyser(),
    arrayData =  new Uint8Array(analyser.frequencyBinCount),
    javascriptNode;

function loadSound (url) {
  console.log('load');
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
            playSound(buffer);
        });
    }
    request.send();
}

function playSound (buffer) {
    sourceNode.buffer = buffer;
    sourceNode.start(0);
}


function setupAudioNodes () {
    javascriptNode = context.createScriptProcessor(2048, 1, 1);
    javascriptNode.connect(context.destination);

    analyser = context.createAnalyser();
    analyser.smoothingTimeConstant = 0.1;
    analyser.fftSize = 1024;

    sourceNode = context.createBufferSource();
    sourceNode.connect(analyser);
    analyser.connect(javascriptNode);
    sourceNode.connect(context.destination);


    javascriptNode.onaudioprocess = function() {
      var array =  new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      average = getAverageVolume(array);
      frequencys = getByteFrequencyData(array);

      splitFrenquencyArray(array);

      if (average != 0) {
        soundStarted = 1;
      }

      if (soundStarted == 1 && average == 0) {
        soundStarted = 0;
        isLaunch = 0;
      }
    }
}

// Split sound array in a bass, medium and treble array
function splitFrenquencyArray(array) {
    var n = 3;
    var tab = Object.keys(array).map(function(key) {
        return array[key]
    });
    var len = tab.length,
        frequencyArray = [],
        i = 0;

    while (i < len) {
        var size = Math.ceil((len - i) / n--);
        frequencyArray.push(tab.slice(i, i + size));
        i += size;
    }

    // 0 = bass
    // 1 = medium
    // 2 = treble
    getBass(frequencyArray[0]);
    getMedium(frequencyArray[1]);
    getTreble(frequencyArray[2]);
}

function getBass(array) {
  var values = 0;
  var length = array.length;
  for (var i = 0; i < length; i++) {
      values += array[i];
  }
  bass = values / length;
  return bass;
}

function getMedium(array) {
  var values = 0;
  var length = array.length;
  for (var i = 0; i < length; i++) {
      values += array[i];
  }
  medium = values / length;
  return medium;
}

function getTreble(array) {
  var values = 0;
  var length = array.length;
  for (var i = 0; i < length; i++) {
      values += array[i];
  }
  treble = values / length;
  return treble;
}

function getByteFrequencyData (array) {
    var values = 0;
    var frequencys;

    var length = array.length;
    for (var i = 0; i < length; i++) {
        values += array[i];
    }
    frequencys = values / length;
    return frequencys;
}


function getAverageVolume (array) {
    var values = 0;
    var average;

    var length = array.length;
    for (var i = 0; i < length; i++) {
        values += array[i];
    }
    average = values / length;
    return average;
}

function handleFileSelect (evt) {
    if (evt) {
      evt.stopPropagation();
      evt.preventDefault();
      var files = evt.srcElement.files;
    } else {
      var files = document.getElementById('fileinput').files;
    }
    var reader = new FileReader();

    if (files[0].type.match('audio.*')) {
      console.log(evt.target.result);
    }
}