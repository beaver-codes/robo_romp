import React from 'react'

export default function Lights() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <directionalLight position={[0, 10, 0]} intensity={1.5} />
        </>
    )
}
