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
    subnetMask: networkClassSplit('any'),
    subnet: networkClassSplit('any')[0],
    ip: '158.1.1.1',
    check: false,
  }

  radioChange = e => {
    console.log(networkClassSplit(e.target.value));
    this.setState({
      networkClass: e.target.value,
      subnetMask: networkClassSplit(e.target.value)
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

  clickHandle = e => {
    this.setState({
      check: true,
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
                  this.state.subnetMask.map((element) =>
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
                  <button class="btn btn-primary" type="submit" onClick={this.clickHandle}>Submit</button>
                </div>
                {
                  this.state.check && <h1>HELLO</h1>
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
