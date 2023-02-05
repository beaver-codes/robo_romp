import React from 'react'
import { COLORS } from '../constants';

interface Props {
    x: number
    z: number
}

const BASE_HEIGHT = 0.3;
const PATH_HEIGHT = 0.1;
const PATH_SIZE = 0.9;

export default function PathTile(props: Props) {
    const { x, z } = props

    return (
        <>
            <mesh position={[x, PATH_HEIGHT / 2 + BASE_HEIGHT, z]}>
                <boxGeometry args={[PATH_SIZE, PATH_HEIGHT, PATH_SIZE]} />
                <meshPhongMaterial color={COLORS.PATH_COLOR} />
            </mesh>
            <mesh position={[x, BASE_HEIGHT / 2, z]}>
                <boxGeometry args={[1, BASE_HEIGHT, 1]} />
                <meshPhongMaterial color={COLORS.BASE_COLOR} />
            </mesh>
        </>
    )
}
