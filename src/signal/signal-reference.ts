class SignalReference<S>{
  reference?: S;
  constructor(reference?:S){
    this.reference = reference;
  }
}

export default SignalReference;