import React, { Component } from 'react';
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
        hexId, } from './utils/helper.js';

class App extends Component {
  state = {
    networkClass: 'any',
    subnetSplit: networkClassSplit('any'),
    subnet: networkClassSplit('any')[0],
    ip: '158.1.1.1',
    check: false,
  }

  radioChange = e => {
    console.log(networkClassSplit(e.target.value));
    this.setState({
      networkClass: e.target.value,
      subnetSplit: networkClassSplit(e.target.value)
    });
  }

  subnetSelect = e => {
    console.log(e.target.value);
    this.setState({
      subnet: e.target.value,
    });
  }
  
  ipChange = e => {
    console.log(e.target.value)
    this.setState({
      ip: e.target.value,
    });
  }

  clickHandler = e => {
    let mask = this.state.subnet.split(' / ')[1]

    this.setState({
      check: true,
      networkAddress: ipToNetworkAddress(this.state.ip, mask),
      usableHostRange:ipToUsableAddressRange(this.state.ip, mask),
      broadcastAddress: ipToBroadcastAddress(this.state.ip, mask),
      totalHosts: subnumToTotalNumberOfHosts(mask),
      usableHosts: subnumToUsableHosts(mask),
      subnetMask: convertToSubnet(mask),
      wildcardMask: convertToWildcard(mask),
      binarySubnetMask: convertToBinarySubnet(mask),
      ipClass: ipClass(mask),
      cidr: cidr(mask),
      ipType: checkIpType(this.state.ip),
      short: shortIp(this.state.ip, mask),
      binaryId: binaryId(this.state.ip),
      decimalId: decimalId(this.state.ip),
      hexId: hexId(this.state.ip),
    })
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="page-header">
              <h1 className="text-center">IP Subnet Calculator</h1>
            </div>
            <div className="text-center">
              <div className="radio-group">
                <label>
                  <input checked={this.state.networkClass === 'any'} type="radio" value="any" name="netClass" onChange={this.radioChange} />
                  Any
                </label>
                <label>
                  <input checked={this.state.networkClass === 'a'} type="radio" value="a" name="netClass" onChange={this.radioChange} />
                  A
                </label>
                <label>
                  <input checked={this.state.networkClass === 'b'} type="radio" value="b" name="netClass" onChange={this.radioChange} />
                  B
                </label>
                <label>
                  <input checked={this.state.networkClass === 'c'} type="radio" value="c" name="netClass" onChange={this.radioChange} />
                  C
                </label>
              </div>
              <div className="subnet-dropdown">
                <select class="custom-select" onChange={this.subnetSelect}>
                {
                  this.state.subnetSplit.map((element) =>
                    <option value={element}>
                      {element}
                    </option>
                  )
                }
                </select>
              </div>
              <div className="input-ip">
                <div class="input-group">
                  <input type="text" class="form-control" placeholder="Please write ip address" onChange={this.ipChange} value={this.state.ip}  />
                  <button class="btn btn-primary" type="submit" onClick={this.clickHandler}>Submit</button>
                </div>
                {
                  this.state.check &&
                  <div>
                    <table class="table table-bordered">
                      <tbody>
                        <tr>
                          <td>IP Address</td>
                          <td>{this.state.ip}</td>
                        </tr>
                        <tr>
                          <td>Network Address</td>
                          <td>{this.state.networkAddress}</td>
                        </tr>
                        <tr>
                          <td>Usable Host IP Range</td>
                          <td>{this.state.usableHostRange}</td>
                        </tr>
                        <tr>
                          <td>Broadcast Address</td>
                          <td>{this.state.broadcastAddress}</td>
                        </tr>
                        <tr>
                          <td>Total Number of Hosts</td>
                          <td>{this.state.totalHosts}</td>
                        </tr>
                        <tr>
                          <td>Number of Usable Hosts</td>
                          <td>{this.state.usableHosts}</td>
                        </tr>
                        <tr>
                          <td>Subnet Mask</td>
                          <td>{this.state.subnetMask}</td>
                        </tr>
                        <tr>
                          <td>Wildcard Mask</td>
                          <td>{this.state.wildcardMask}</td>
                        </tr>
                        <tr>
                          <td>Binary Subnet Mask</td>
                          <td>{this.state.binarySubnetMask}</td>
                        </tr>
                        <tr>
                          <td>IP Class</td>
                          <td>{this.state.ipClass}</td>
                        </tr>
                        <tr>
                          <td>CIDR Notation</td>
                          <td>{this.state.cidr}</td>
                        </tr>
                        <tr>
                          <td>IP Type</td>
                          <td>{this.state.ipType}</td>
                        </tr>
                        <tr>
                          <td>Short</td>
                          <td>{this.state.short}</td>
                        </tr>
                        <tr>
                          <td>Binary ID</td>
                          <td>{this.state.binaryId}</td>
                        </tr>
                        <tr>
                          <td>Integer ID</td>
                          <td>{this.state.decimalId}</td>
                        </tr>
                        <tr>
                          <td>Hex ID</td>
                          <td>{this.state.hexId}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
