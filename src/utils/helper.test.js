import { expect } from 'chai';
import { plus, convertToSubnet, convertBinaryToSubnet, ipToBroadcastAddress, ipToUsableAddressRange, networkClassSplit, ipToNetworkAddress, subnumToTotalNumberOfHosts } from './helper';

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