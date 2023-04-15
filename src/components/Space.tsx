import React from 'react'

interface SpaceProps {
    height?: number | string,
    backgroundColor?: string
}



const Space: React.FC<SpaceProps> = ({
    height = '2%',
    backgroundColor = 'transparent'
}) => {
    // 处理prop.height
    if (typeof height === 'number') {
        height = height + 'px';
    }
    // 处理prop.backgroundColor
    // 如果不为十六进制颜色值或者rgba值，则将其设置为transparent
    if (!backgroundColor.match(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/) && !backgroundColor.match(/^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d{1,3})\)$/)) {
        backgroundColor = 'transparent';
    }


    return (
        <div style={{height: height,backgroundColor: backgroundColor}}>
        </div>
    )
}

export default Space