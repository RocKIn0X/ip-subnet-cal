export const convertToSubnet = (a) => {
    const subnet = [0, 0, 0, 0].map(() => {
        const sub = '00000000'.split('').map((zero) => {
            a -= 1;
            return a >= 0 ? '1' : '0';
        })
        return parseInt(sub.join(''), 2);
    })
    return subnet.join('.');
}

export const convertToWildcard = (a) => {
    const subnet = [0, 0, 0, 0].map(() => {
        const sub = '00000000'.split('').map((zero) => {
            a -= 1;
            return a >= 0 ? '0' : '1';
        })
        return parseInt(sub.join(''), 2);
    })
    return subnet.join('.');
}

export const convertToBinarySubnet = (a) => {
    const subnet = [0, 0, 0, 0].map(() => {
        const sub = '00000000'.split('').map((zero) => {
            a -= 1;
            return a >= 0 ? '1' : '0';
        })
        return sub.join('');
    })
    console.log(subnet.join('.'))
    return subnet.join('.');
}

export const ipClass = (a) => {
    if (a < 8) {
        return 'None'
    } else if (a < 16) {
        return 'A'
    } else if (a < 24) {
        return 'B'
    } else {
        return 'C'
    }
}

export const cidr = (a) => {
    return '/' + a  
}

export const networkClassSplit = (type) => {
    const typeDict = {
        any: 1,
        a: 8,
        b: 16,
        c: 24
    }
    const subnet = new Array(32 - typeDict[type] +1).fill(0);
    return subnet.map((s, index) => 
        `${convertToSubnet(index+typeDict[type])} / ${index+typeDict[type]}`
    ).reverse()
}

export const convertBinaryToSubnet = (binary) => {
    const subnet = [0, 0, 0, 0].map((i, index) => {
        return parseInt(binary.substr(index * 8, 8), 2)
    })
    return subnet.join('.');
}

export const ipToNetworkAddress = (ip, mask) => {
    const binaryIp = decimalIpToBinary(ip)
    .split('')
    .map((s, index) => {
        mask -= 1;
        return mask >= 0 && s === '1' ? '1' : '0'
    })
    .join('')

    return convertBinaryToSubnet(binaryIp)
}

export const ipToBroadcastAddress = (ip, mask) => {
    const binaryIp = decimalIpToBinary(ip)
    .split('')
    .map((s, index) => {
        mask -= 1;
        return mask >= 0 && s === '0' ? '0' : '1'
    })
    .join('')

    return convertBinaryToSubnet(binaryIp)
}

export const ipToUsableAddressRange = (ip, mask) => {
    let maskTemp = mask
    const firstIp = decimalIpToBinary(ip)
    .split('')
    .map((s, index) => {
        mask -= 1;
        return mask >= 0 && s === '1' || index === 31 ? '1' : '0'
    })
    .join('')
    
    const lastIp = decimalIpToBinary(ip)
    .split('')
    .map((s, index) => {
        maskTemp -= 1;
        return maskTemp >= 0 && s === '0' || index === 31 ? '0' : '1'
    })
    .join('')

    return convertBinaryToSubnet(firstIp) + ' - ' + convertBinaryToSubnet(lastIp)
}

export const subnumToTotalNumberOfHosts = (sub) => {
    return Math.pow(2, 32 - sub);
}

export const subnumToUsableHosts = (sub) => {
    return subnumToTotalNumberOfHosts(sub) - 2;
}

export const checkIpType = (ip) => {
    const check = ip.split('.')
    if (check[0] === '10') {
        // console.log('Private')
        return 'Private'
    } else if (check[0] === '172' && (16 <= check[1] && check[1] <= 31)) {
        // console.log('Private')
        return 'Private'
    } else if (check[0] === '192' && check[1] === '168') {
        // console.log('Private')
        return 'Private'
    } else {
        // console.log('Public')
        return 'Public'
    }
}

export const shortIp = (ip, sub) => {
    return ip + '/' + sub;
}

export const binaryId = (ip) => {
    return parseInt(decimalIpToBinary(ip), 2).toString(2)
}

const decimalIpToBinary = ip =>
    ip.split('.')
    .map(ipChar => '0'.repeat(8 - (+ipChar).toString(2).length) + (+ipChar).toString(2))
    .join('')

export const plus = (x, y) => x + y;
