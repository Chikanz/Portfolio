import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Bounds, useBounds, OrbitControls, ContactShadows, useGLTF, PresentationControls, useCursor } from '@react-three/drei'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from 'three'


const items = {
  "VR": {
    title: "VR",
    description: "I love VR! I was an early adopter and have been following the scene closely after getting my vive in 2016. I have a silly amount of hours in beat saber"
  },
  "Camera_mesh": {
    title: 'Photography',
    description: 'Taking photos is a fun hobby, although I usually end up just taking photos of the dog. I shoot on a Fujifilm XT-2 with a 16-55mm f/2.8 lens'
  },
  "Headphones": {
    title: 'Music',
    description: "I love music, especially when it's live. I've got a decent little collection of records too. Some of my favorite artists are The Smith Street Band, Kero kero bonito, Jeff Rosenstock and Anamanaguchi",
  },
  "Coffee": {
    title: 'Coffee',
    description: "i love me some bean juice, just inject it straight into my veins",
  },
  "Duck": {
    title: 'quack quack',
    description: '-duck'
  },
  "Pizza_Slice": {
    title: 'pizza pizza',
    description: '-pizza'
  },
  "Tent": {
    title: 'Camping',
    description: "I love camping and was big on the outdoors club in uni. I was even on the committee for a bit. I've also been climbing for about 5 years now and love a good climbing trip.",
  },
  "Pan": {
    title: 'Cooking',
    description: "I'm not half bad at cooking. I'll make you a damn good burrito."
  },
  "Houseplant": {
    title: 'House plants',
    description: "Catch me at bunnings on the weekend buying more plants than I can handle. I also love gardening!"
  },
  "Curly": {
    title: "I'm just a decorative thing",
    description: "leave me alone",
  },
  "Zac": {
    title: "That's me!",
    description: "Please stop poking me",
  },

}

function setText(name) {
  document.getElementById("text").innerHTML = items[name].title;
  document.getElementById("desc").innerHTML = items[name].description;
}

const nodes = [
  "Curly",
  "Camera_mesh",
  "Duck",
  "VR",
  "Coffee",
  "Houseplant",
  "Pan",
  "Tent",
  "Headphones",
  "Pizza_Slice",
  "Sphere",
];



export default function Junk(props) {
  return (
    <div className='relative h-full'>
      <Canvas camera={{ position: [0, -10, 80], fov: 50 }} dpr={[1, 2]} className={''}>
        <spotLight position={[-100, -100, -100]} intensity={0.2} angle={0.3} penumbra={1} />
        {/* <spotLight position={[-100, -100, -100]} intensity={4} angle={0.3} penumbra={1} /> */}
        <hemisphereLight color="white" groundColor="#ff0f00" position={[-7, 25, 13]} intensity={1} />
        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.2}>
            <SelectToZoom >
              {
                nodes.map((node) => {
                  return <Model key={node} name={node} />
                })
              }

              <Zac />

            </SelectToZoom>
          </Bounds>
          {/* <ContactShadows rotation-x={Math.PI / 2} position={[0, -35, 0]} opacity={0.2} width={200} height={200} blur={1} far={50} /> */}
        </Suspense>
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Text display */}
      <div className='absolute bottom-0 w-full h-[30%] flex flex-col gap-3 opacity-100'>
        <h1 id="text" className='text-4xl font-medium text-center opacity-0 transition-opacity'></h1>
        <h1 id="desc" className='text-xl text-center px-[10%] 2xl:px-[25%] opacity-0 transition-opacity'></h1>
      </div>
    </div>
  )
}

function Model({ name, material, ...props }) {
  const { nodes, materials } = useGLTF('/junk_test.gltf');

  // console.log(nodes);

  const [hovered, setHovered] = useState(false)
  useCursor(hovered);

  if (!nodes[name]) return null;

  return <mesh
    geometry={nodes[name].geometry}
    material={nodes[name].material}
    name={name}
    material-emissive={name.includes("Mesh") ? "#000000" : "#4E1CBE"}
    material-side={name === "Houseplant" ? 2 : 0}
    material-roughness={1}
    onClick={() => setText(name)}
    onPointerOver={() => setHovered(true)}
    onPointerOut={() => setHovered(false)}
    {...props}
    dispose={null} >
  </mesh>
}

// This component wraps children in a group with a click handler
// Clicking any object will refresh and fit bounds
function SelectToZoom(props) {

  const api = useBounds();
  function handleClick(e) {
    e.stopPropagation();
    if (e.delta <= 2) {
      api.refresh(e.object).fit();
    }

    //Fade in
    document.getElementById("text").classList.remove('opacity-0');
    document.getElementById("text").classList.add('opacity-100');

    document.getElementById("desc").classList.remove('opacity-0');
    document.getElementById("desc").classList.add('opacity-100');

    document.querySelector("#clickhint").classList.add('opacity-0');
  }

  function handleMiss(e) {
    e.button === 0 && api.refresh().fit();

    //Fade out
    document.getElementById("text").classList.remove('opacity-100');
    document.getElementById("text").classList.add('opacity-0');

    document.getElementById("desc").classList.remove('opacity-100');
    document.getElementById("desc").classList.add('opacity-0');
  }

  return (
    <group onClick={handleClick} onPointerMissed={handleMiss}>
      {props.children}
    </group>
  )
}

const Zacs = [
  "Mesh",
  "Mesh_1",
  "Mesh_2",
  "Mesh_3",
  "Mesh_4",
  "Mesh_5",
  "Mesh_6",
]
function Zac(props) {

  // Make head bobble
  const head = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 2;
    head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, Math.cos(t / 10) / 100, 0.1);
    head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, Math.sin(t / 5) / 4, 0.1);
    head.current.rotation.z = THREE.MathUtils.lerp(head.current.rotation.z, Math.sin(t / 10) / 10, 0.1);
    head.current.position.y = THREE.MathUtils.lerp(head.current.position.y, (-2 + Math.sin(t)) / 3, 0.1);
  });

  return (
    <group ref={head} >
      {
        Zacs.map((node) => {
          return <Model key={node} name={node} onClick={() => setText("Zac")} />
        })
      }
    </group>
  )
}
