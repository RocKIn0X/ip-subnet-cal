import { expect } from 'chai';
import { plus, 
        convertToSubnet, 
        convertBinaryToSubnet, 
        ipToBroadcastAddress, 
        ipToUsableAddressRange, 
        networkClassSplit, 
        ipToNetworkAddress, 
        subnumToTotalNumberOfHosts, 
        subnumToUsableHosts, 
        convertToWildcard, 
        convertToBinarySubnet,
        ipClass, 
        cidr, 
        checkIpType, 
        shortIp, 
        binaryId, 
        decimalId, 
        hexId, } from './helper';

describe('test plus', () => {
  it('should plus number', () => {
    expect(plus(1, 2)).to.equal(3);
    expect(plus(0, 2)).to.equal(2);
  })
})

describe('test convertToSubnet', () => {
  it('should convert to subnet', () => {
    expect(convertToSubnet(1)).to.equal('128.0.0.0');
    expect(convertToSubnet(5)).to.equal('248.0.0.0');
    expect(convertToSubnet(17)).to.equal('255.255.128.0');
  })
})

describe('test network class split', () => {
  it('should show array of subnet', () => {
    const expectedValued = [
      `${convertToSubnet(32)} / 32`,
      `${convertToSubnet(31)} / 31`,
      `${convertToSubnet(30)} / 30`,
      `${convertToSubnet(29)} / 29`,
      `${convertToSubnet(28)} / 28`,
      `${convertToSubnet(27)} / 27`,
      `${convertToSubnet(26)} / 26`,
      `${convertToSubnet(25)} / 25`,
      `${convertToSubnet(24)} / 24`,
    ]
    const value = networkClassSplit('c');
    value.map((subnet, index) => {
      expect(subnet).to.equal(expectedValued[index]);
    }) 
  })
})

describe('test ip to network address', () => {
  it('should show network address', () => {
    expect(ipToNetworkAddress('178.233.14.6', 29)).to.equal('178.233.14.0');
    expect(ipToNetworkAddress('178.233.14.96', 28)).to.equal('178.233.14.96');
    expect(ipToNetworkAddress('178.233.14.53', 28)).to.equal('178.233.14.48');
    expect(ipToNetworkAddress('178.233.14.53', 21)).to.equal('178.233.8.0');
    expect(ipToNetworkAddress('129.2.45.100', 20)).to.equal('129.2.32.0');
  })
})

describe('test ip to broadcast address', () => {
  it('should show broadcast address', () => {
    expect(ipToBroadcastAddress('158.108.12.34', 20)).to.equal('158.108.15.255');
    expect(ipToBroadcastAddress('129.2.45.100', 20)).to.equal('129.2.47.255');
    expect(ipToBroadcastAddress('129.2.45.100', 15)).to.equal('129.3.255.255');
    expect(ipToBroadcastAddress('233.1.3.2', 12)).to.equal('233.15.255.255');
  })
})

describe('test ip to usable ip range', () => {
  it('should show usable ip range', () => {
    expect(ipToUsableAddressRange('233.1.5.2', 20)).to.equal('233.1.0.1 - 233.1.15.254');
    expect(ipToUsableAddressRange('17.250.4.3', 13)).to.equal('17.248.0.1 - 17.255.255.254');
    expect(ipToUsableAddressRange('158.0.2.4', 4)).to.equal('144.0.0.1 - 159.255.255.254');
    expect(ipToUsableAddressRange('192.0.0.0', 28)).to.equal('192.0.0.1 - 192.0.0.14');
    expect(ipToUsableAddressRange('233.200.45.108', 16)).to.equal('233.200.0.1 - 233.200.255.254');
  })
})

describe('test subnet number to total number of hosts', () => {
  it('should show total number of hosts', () => {
    expect(subnumToTotalNumberOfHosts(24)).to.equal(256);
    expect(subnumToTotalNumberOfHosts(3)).to.equal(536870912);
    expect(subnumToTotalNumberOfHosts(14)).to.equal(262144);
    expect(subnumToTotalNumberOfHosts(28)).to.equal(16);
    expect(subnumToTotalNumberOfHosts(9)).to.equal(8388608);
  })
})

describe('test number of usable hosts', () => {
  it('should show number of usable hosts', () => {
    expect(subnumToUsableHosts(24)).to.equal(254);
    expect(subnumToUsableHosts(3)).to.equal(536870910);
    expect(subnumToUsableHosts(14)).to.equal(262142);
    expect(subnumToUsableHosts(28)).to.equal(14);
    expect(subnumToUsableHosts(9)).to.equal(8388606);
    expect(subnumToUsableHosts(32)).to.equal(0);
  })
})

describe('test subnet mask', () => {
  it('should show subnet mask', () => {
    expect(convertToSubnet(9)).to.equal('255.128.0.0');
    expect(convertToSubnet(12)).to.equal('255.240.0.0');
    expect(convertToSubnet(19)).to.equal('255.255.224.0');
    expect(convertToSubnet(27)).to.equal('255.255.255.224');
  })
})

describe('test wildcard mask', () => {
  it('should show wildcard mask', () => {
    expect(convertToWildcard(5)).to.equal('7.255.255.255');
    expect(convertToWildcard(9)).to.equal('0.127.255.255');
    expect(convertToWildcard(12)).to.equal('0.15.255.255');
    expect(convertToWildcard(19)).to.equal('0.0.31.255');
    expect(convertToWildcard(27)).to.equal('0.0.0.31');
  })
})

describe('test binary subnet mask', () => {
  it('should show binary subnet mask', () => {
    expect(convertToBinarySubnet(5)).to.equal('11111000.00000000.00000000.00000000');
    expect(convertToBinarySubnet(12)).to.equal('11111111.11110000.00000000.00000000');
    expect(convertToBinarySubnet(19)).to.equal('11111111.11111111.11100000.00000000');
    expect(convertToBinarySubnet(23)).to.equal('11111111.11111111.11111110.00000000');
    expect(convertToBinarySubnet(28)).to.equal('11111111.11111111.11111111.11110000');
  })
})

describe('test IP class', () => {
  it('should show IP class', () => {
    expect(ipClass(5)).to.equal('None');
    expect(ipClass(7)).to.equal('None');
    expect(ipClass(8)).to.equal('A');
    expect(ipClass(15)).to.equal('A');
    expect(ipClass(16)).to.equal('B');
    expect(ipClass(23)).to.equal('B');
    expect(ipClass(24)).to.equal('C');
    expect(ipClass(28)).to.equal('C');
    expect(ipClass(32)).to.equal('C');
  })
})

describe('test CIDR notation', () => {
  it('should show CIDR notation', () => {
    expect(cidr(5)).to.equal('/5');
    expect(cidr(7)).to.equal('/7');
    expect(cidr(8)).to.equal('/8');
    expect(cidr(15)).to.equal('/15');
    expect(cidr(16)).to.equal('/16');
    expect(cidr(23)).to.equal('/23');
    expect(cidr(24)).to.equal('/24');
    expect(cidr(28)).to.equal('/28');
    expect(cidr(32)).to.equal('/32');
  })
})

describe('test IP type', () => {
  it('should show IP type', () => {
    expect(checkIpType('10.0.0.0')).to.equal('Private');
    expect(checkIpType('10.243.12.45')).to.equal('Private');
    expect(checkIpType('0.1.0.2')).to.equal('Public');
    expect(checkIpType('172.31.255.255')).to.equal('Private');
    expect(checkIpType('192.168.3.4')).to.equal('Private');
    expect(checkIpType('190.255.255.255')).to.equal('Public');
  })
})

describe('test short IP', () => {
  it('should show short', () => {
    expect(shortIp('0.1.1.1', 27)).to.equal('0.1.1.1/27');
    expect(shortIp('10.1.1.1', 18)).to.equal('10.1.1.1/18');
    expect(shortIp('192.68.35.100', 4)).to.equal('192.68.35.100/4');
    expect(shortIp('47.235.255.1', 12)).to.equal('47.235.255.1/12');
    expect(shortIp('40.125.122.13', 19)).to.equal('40.125.122.13/19');
  })
})

describe('test binary ID', () => {
  it('should show binary ID', () => {
    expect(binaryId('40.125.122.13')).to.equal('101000011111010111101000001101');
    expect(binaryId('1.0.1.0')).to.equal('1000000000000000100000000');
    expect(binaryId('255.255.255.5')).to.equal('11111111111111111111111100000101');
    expect(binaryId('0.0.0.5')).to.equal('101');
    expect(binaryId('192.168.1.1')).to.equal('11000000101010000000000100000001');
    expect(binaryId('0.0.12.2')).to.equal('110000000010');
  })
})

describe('test decimal ID', () => {
  it('should show decimal ID', () => {
    expect(decimalId('40.125.122.13')).to.equal('679311885');
    expect(decimalId('1.0.1.0')).to.equal('16777472');
    expect(decimalId('255.255.255.5')).to.equal('4294967045');
    expect(decimalId('0.0.0.5')).to.equal('5');
    expect(decimalId('192.168.1.1')).to.equal('3232235777');
    expect(decimalId('0.0.12.1')).to.equal('3073');
  })
})

describe('test hex ID', () => {
  it('should show hex ID', () => {
    expect(hexId('40.125.122.13')).to.equal('287d7a0d');
    expect(hexId('1.0.1.0')).to.equal('1000100');
    expect(hexId('255.255.255.5')).to.equal('ffffff05');
    expect(hexId('0.0.0.5')).to.equal('5');
    expect(hexId('192.168.1.1')).to.equal('c0a80101');
    expect(hexId('0.0.12.1')).to.equal('c01');
  })
})