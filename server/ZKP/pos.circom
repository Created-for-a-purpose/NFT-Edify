pragma circom 2.0.0;

template pos(){

  // Private input signals
  signal input attestor[160];
  signal input schema[256];
  signal input expiration;

  // Public input signal
  signal input expExpiration;

  // Public output signal
  signal output out;

  expiration === expExpiration;     // Attestation should not be expired

  var _attestor = 0x6b29615CcDbA6e0e803F808D42e4477324F94D41;
  var _schema1 = 0xc654a0417289e5acb2b16a06d8a9d8bc;
  var _schema2 = 0x7da5aad2f7d13f74b59bffa11d0c80ee;

  for(var i=0;i<160;i++){
    var x = ((_attestor>>i) & 1);
    var y = x*attestor[159-i];
    x === y;
  }

   for(var i=0;i<128;i++){
     var a = ((_schema1>>i) & 1);
     var b = a*schema[127-i];
     a === b;
    }

    for(var i=0;i<128;i++){
      var a = ((_schema2>>i) & 1);
      var b = a*schema[255-i];
      a === b;
     }
    
  out <== 1;
   
}

component main{public [expExpiration]}= pos();

