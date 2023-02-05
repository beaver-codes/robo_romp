import { OrbitControls } from '@react-three/drei'
import React from 'react'

export default function DevHelpers() {
    return (
        <>
            <OrbitControls />
            <gridHelper />
            <axesHelper />
        </>
    )
}
