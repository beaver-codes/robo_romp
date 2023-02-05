import React from 'react'

interface Props {
    x: number
    z: number
}

const HEIGHT = 0.5;
const COLOR = '#9395a1'

export default function RockTile(props: Props) {
    const { x, z } = props

    return (
        <mesh position={[x, HEIGHT / 2, z]}>
            <boxGeometry args={[1, HEIGHT, 1]} />
            <meshPhongMaterial color={COLOR} />
        </mesh>
    )
}
