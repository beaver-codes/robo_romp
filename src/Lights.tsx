import React from 'react'

export default function Lights() {
    return (
        <>
            <ambientLight intensity={0.1} />
            <directionalLight position={[10, 10, 5]} intensity={0.3} castShadow={true} />
            <directionalLight position={[0, 10, 0]} intensity={0.3} castShadow={true} />
        </>
    )
}
