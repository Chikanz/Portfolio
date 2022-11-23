import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bounds, useBounds, OrbitControls, ContactShadows, useGLTF, PresentationControls, useCursor } from '@react-three/drei'


const items = {
  "VR_Headset": {
    title: "VR",
    description: "I love VR! I was an early adopter and have been following the scene closely after getting my vive in 2016. I have a silly amount of hours in beat saber"
  }
}

/*
Camera - taking photos is a fun hobby of mine, although I usually end up just taking photos of the dog
Headphones - I love live music and listening to music, some of my favorite artists are The Smith Street Band, Kero kero bonito, Jeff Rosenstock and Anamanaguchi
Coffee - i love me some bean juice, just inject it straight into my veins
Camping shit - I'm really into bouldering and climbing, and I love camping and hiking
Duck - "quack quack" - duck
Pizza - who doesn't love a good .pizza domain to host all your websites on
Pan - I'm not half bad at cooking. I'll make you the best burrito you've had in your life.
House plant - Catch me at bunnings on the weekend buying too many plants. I also love gardening!
*/

function setText(name) {
  document.getElementById("text").innerHTML = items[name].title;
  document.getElementById("desc").innerHTML = items[name].description;
}

export default function Junk(props) {
  return (
    <div className='relative h-full'>
      <Canvas camera={{ position: [0, -10, 80], fov: 50 }} dpr={[1, 2]} className={''}>
        <spotLight position={[-100, -100, -100]} intensity={0.2} angle={0.3} penumbra={1} />
        <hemisphereLight color="white" groundColor="#ff0f00" position={[-7, 25, 13]} intensity={1} />
        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.2}>
            <SelectToZoom >
              <Model name="Curly" position={[1, -11, -20]} rotation={[2, 0, -0]} />
              <Model name="DNA" position={[20, 0, -17]} rotation={[1, 1, -2]} />
              <Model name="Headphones" position={[20, 2, 4]} rotation={[1, 0, -1]} />
              <Model name="Notebook" position={[-21, -15, -13]} rotation={[2, 0, 1]} />
              <Model name="Rocket003" position={[18, 15, -25]} rotation={[1, 1, 0]} />
              <Model name="Roundcube001" position={[-25, -4, 5]} rotation={[1, 0, 0]} scale={0.5} />
              <Model name="Table" position={[1, -4, -28]} rotation={[1, 0, -1]} scale={0.5} />
              <Model name="VR_Headset" position={[7, -15, 28]} rotation={[1, 0, -1]} scale={5} />
              <Model name="Zeppelin" position={[-20, 10, 10]} rotation={[3, -1, 3]} scale={0.005} />
            </SelectToZoom>
          </Bounds>
          {/* <ContactShadows rotation-x={Math.PI / 2} position={[0, -35, 0]} opacity={0.2} width={200} height={200} blur={1} far={50} /> */}
        </Suspense>
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} enableZoom={false} />
      </Canvas>

      {/* Text display */}
      <div className='absolute bottom-0 w-full h-[30%] flex flex-col gap-3 opacity-100'>
        <h1 id="text" className='text-4xl font-medium text-center opacity-0 transition-opacity'></h1>
        <h1 id="desc" className='text-xl text-center px-[10%] 2xl:px-[25%] opacity-0 transition-opacity'></h1>
      </div>
    </div>
  )
}

function Model({ name, ...props }) {
  const { nodes } = useGLTF('/junk.glb');

  const [hovered, setHovered] = useState(false)
  useCursor(hovered);

  return <mesh
    geometry={nodes[name].geometry}
    material={nodes[name].material}
    name={name} material-emissive="#4E1CBE"
    material-roughness={1}
    onClick={() => setText(name)}
    onPointerOver={() => setHovered(true)} 
    onPointerOut={() => setHovered(false)}
    {...props}
    dispose={null} />
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
