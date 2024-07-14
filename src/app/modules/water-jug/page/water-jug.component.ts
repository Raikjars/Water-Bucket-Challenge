import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-water-jug',
  templateUrl: './water-jug.component.html',
  styleUrls: ['./water-jug.component.scss']
})
export class WaterJugComponent {

  formGroup: FormGroup;
  isEnabled: boolean = false;

  scenarioA: any[] = [];
  scenarioB: any[] = [];
  bestScenario: any[] = [];
  worstScenario: any[] = [];
  jugXValue: number = 0;
  jugYValue: number = 0;

  solution: string ="";
  isFinish: boolean = false;

  constructor(private formBuilder: FormBuilder){
    this.resetForm()
  }

  resetForm(){//inicializa el formulario
    this.formGroup = this.formBuilder.group({
      jugX: [2, [Validators.required,Validators.min(1)]],
      jugY:[10, [Validators.required,Validators.min(1)]],
      jugZ: [4, [Validators.required,Validators.min(1)]]
    });

    this.formGroup.statusChanges.subscribe(status => {
      this.isEnabled = (status == "VALID" ? true : false);
    });

  }
 
  // return greatest common divisor of 'a' and 'b'.
  greatestCommonDivisor(a: number , b: number) {
    if (b == 0)
        return a;

    return this.greatestCommonDivisor(b, a % b);
  }

  /*
   fromCap -- Capacity of jug from which 
   water is poured toCap -- Capacity of
    jug to which water is poured
    d -- Amount to be measured
   */
  pour(fromCap , toCap , d, jugCase: number) 
  {

    // Initialize current amount of water
    // in source and destination jugs
    var from = fromCap;
    var to = 0;

    // Initialize count of steps required
    var step = 1; // Needed to fill "from" Jug
    jugCase == 0 ? 
        this.scenarioA[0] = {
          'jugX': fromCap,
          'jugY': 0,
          'action': "Fill bucket X"
        }
        : this.scenarioB[0] = {
          'jugX': 0,
          'jugY': fromCap,
          'action': "Fill bucket Y"
        }
    
    // Break the loop when either of the two
    // jugs has d litre water
    while (from != d && to != d) {

        // Find the maximum amount that can be poured
        var temp = Math.min(from, toCap - to);

        // Pour "temp" liters from "from" to "to"
        to += temp;
        from -= temp;

        // Increment count of steps
        step++;

        
        jugCase == 0 ? 
          this.scenarioA[step-1] = {
            'jugX': from,
            'jugY': to,
            'action': "Transfer from bucket X to bucket Y"
          }
          : this.scenarioB[step-1] = {
            'jugX': to,
            'jugY': from,
            'action': "Transfer from bucket Y to bucket X"
          }

        
        
        if (from == d || to == d)
            break;

        // If first jug becomes empty, fill it
        if (from == 0) {
          from = fromCap;
          step++;
          jugCase == 0 ? 
              this.scenarioA[step-1] = {
                'jugX': fromCap,
                'jugY': 0,
                'action': "Fill bucket X"
              }
              : this.scenarioB[step-1] = {
                'jugX': 0,
                'jugY': fromCap,
                'action': "Fill bucket Y"
              }
        }

        // If second jug becomes full, empty it
        if (to == toCap) {
          to = 0;
          step++;
          jugCase == 0 ? 
              this.scenarioA[step-1] = {
                'jugX': 0,
                'jugY': toCap,
                'action': "Empty bucket X"
              }
              : this.scenarioB[step-1] = {
                'jugX': toCap,
                'jugY': 0,
                'action': "Empty bucket Y"
              }
        }
      }
      return step;
  }

  // Returns count of minimum steps needed to
  // measure d liter
  minSteps(jugX , jugY , jugZ) {

    this.scenarioA = [];
    this.scenarioB = [];
    this.worstScenario = [];
    this.bestScenario = [];
    this.jugXValue = 0;
    this.jugYValue = 0;
    this.isFinish = false;

    // To make sure that jugY is smaller than jugX
    if (jugY > jugX) {
        var t = jugY;
        jugY = jugX;
        jugX = t;
    }
        
    // If greatest common divisor of jugX and jugY does not divide jugZ
    // then solution is not possible
    if ((jugZ % this.greatestCommonDivisor(jugX, jugY)) != 0){
      this.solution = 'No Solution'
      return -1;
    }
        
    // Return minimum two cases:
    // a) Water of jugX liter jug is poured into
    // jugX liter jug
    // b) Vice versa of "a"
    //this.solution = "Minimum number of steps required is " + Math.min(this.pour(jugX, jugY, jugZ,0), this.pour(jugY, jugX, jugZ,1))
    let case1 = this.pour(jugX, jugY, jugZ, 1);
    let case2 = this.pour(jugY, jugX, jugZ, 0);

    if(case1 > case2){
      this.initiateAnimation(this.scenarioA)
      this.worstScenario = this.scenarioB
    }else{
      this.initiateAnimation(this.scenarioB)
      this.worstScenario = this.scenarioA
    }
    return Math.min(case1, case2)
  }

  initiateAnimation(scenario: any[]){
      let index = 0;
      setInterval(() => {
        if (index == scenario.length){
          this.isFinish = true;
          return;
        }
        this.bestScenario.push(scenario[index]);
        this.jugXValue = scenario[index].jugX;
        this.jugYValue = scenario[index].jugY;
        index++;
      }, 3000);
      
  };
    

  // Driver cod let n = 3, m = 5, d = 4;

  validateZero(jugValue: number, jugName: string){
    if(jugValue==0){
      this.formGroup.controls[jugName].setValue(1);
    }
  }
}
