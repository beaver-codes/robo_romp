import React from 'react'
import { COLORS } from '../constants';

interface Props {
    x: number
    z: number
}

const HEIGHT = 0.5;

export default function BaseTile(props: Props) {
    const { x, z } = props

    return (
        <mesh position={[x, HEIGHT / 2, z]}>
            <boxGeometry args={[1, HEIGHT, 1]} />
            <meshPhongMaterial color={COLORS.BASE_COLOR} />
        </mesh>
    )
}
