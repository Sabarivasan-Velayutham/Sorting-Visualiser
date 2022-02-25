
import './App.css';
import React, { useState } from 'react';

const sorts = [
  'Selection Sort',
  'Insertion Sort',
  'Bubble Sort',
  'Merge Sort',
  'Quick Sort',
  'Shell Sort'
]

function App() 
{

  // state functions to change the data on the screen 
  const [enteredArray, setEnteredArray] = useState(0) ; 
  const [isArrayValid, setArrayValid] = useState(true) ;
  const [array,setarray]=useState([]);
  const [array_swap,setarr_swap]=useState([]);


  function ArrayChangeHandler(event) 
  {
    if(event.target.value > 0 && event.target.value <= 100 ) 
    {
      setArrayValid(true)
    } 
    else
      alert("Enter value <= 100 ...") 

    setEnteredArray(event.target.value)
  }

  function submitHandler(event) 
  {
    //to prevent the refreshment of that page after submitting 
    event.preventDefault()

    if(enteredArray === 0 || enteredArray === '' ) 
    {
      alert("Please enter array size ...")
      setArrayValid(false)
      return;
    }

    //store the data in resp. variables from the executed funcs from the events 
    const array_size = enteredArray ; 

    console.log(array_size)
    Generate_array(array_size) ; 
  }

  function Chose_func(name)
  {
      if (name === 'Selection Sort')
          Selection() ;  
      else if (name === 'Insertion Sort')
          Insertion() ; 
      else if (name === 'Bubble Sort')
          Bubble() ;
      else if (name === 'Merge Sort')
          Merge() ;           
      else if (name === 'Quick Sort')
          Quick() ;
      else if (name === 'Shell Sort')
          Shell() ;
  }

  const buttons = sorts.map((element) =>(
        <button  key={element} onClick={() => Chose_func(element)} >{element} </button>      
  )) ; 

  const diagram = array.map((element,id)=>(
    <div className="arrayElement"
      key={id}
      style={{height:`${element}px`,
      backgroundColor:array_swap.includes(id)?'red':'white'
    }}>

    </div>
)) ;


  function Generate_array(array_size) 
  {
      var list = [] ; 

      for (let i = 0 ; i < array_size ; i++)
      {
        var value = Math.floor(Math.random() * 300) + 10; 
        list.push(value) ; 
      }
      console.log(list) ; 
      setarray(list);
      setarr_swap([]) ; 
  }

  //  function to disable the button
  function Disable()
  {
    // To disable the button "Generate Array"
    var button = document.getElementsByTagName("button")
    for (let i = 0 ; i<button.length ; i++)
    {
      button[i].disabled = true ; 
      button[i].style.backgroundColor = '#d8b6ff'
    }  
  }

  //  function to enable the button
  function Enable()
  {
    // To enable the button "Generate Array"
    var button = document.getElementsByTagName("button")
    for (let i = 0 ; i<button.length ; i++)
    {
      button[i].disabled = false ; 
      button[i].style.backgroundColor = 'rgb(3, 184, 48)'
    }  
  }
  
  function Delay(ms)
  {
    return new Promise(resolve => setTimeout(resolve,ms))
  }

  function swap(array,ele1, ele2)
  {
      var temp = array[ele1];
      array[ele1] = array[ele2];
      array[ele2] = temp;
  }

  
  async function Selection() 
  {
    Disable(); 
    var arr = array ; 
    var n = array.length ; 
    var i, j, min;
  
    // One by one move boundary of unsorted subarray
    for (i = 0; i < n-1; i++)
    {
        let swapping = [] ; 
        // Find the minimum element in unsorted array
        min = i;
        swapping.push(i) ; 
        for (j = i + 1; j < n; j++)
        {
          if (arr[j] < arr[min])
          {
              min = j ; 
          }
        }
      // Swap the found minimum element with the first element
      swapping.push(min)
      await Delay(100) ; 
      setarr_swap(swapping) ; 
      swap(arr,min, i);
      await Delay(100)
      setarr_swap([]) ; 
      setarray(arr)
    }
    console.log(array)
    Enable() ; 
  }

  async function Insertion() 
  {
    Disable() ; 
    var arr = array ; 
    var n = array.length ; 
    
    for (let i = 1; i < n; i++)
    { 
        let swapping = [] ; 
        swapping.push(i)
        var key = arr[i]; 
        var j = i - 1; 
   
        /* Move elements of arr[0..i-1], that are 
        greater than key, to one position ahead 
        of their current position */
        while (j >= 0 && arr[j] > key)
        { 
            swapping.push(j)
            arr[j + 1] = arr[j]; 
            j = j - 1;             
        } 
        arr[j + 1] = key; 

        setarr_swap(swapping) ; 
        await Delay(100)
        setarr_swap([]) ; 
        setarray(arr)
    }
    console.log(array)
    Enable() ; 
  }

  async function Bubble() 
  {
    Disable() ; 
    var arr = array ; 
    var n = array.length ; 
    for (let i = 0; i < n-1; i++)
    {

      for (let j = 0; j < n-i-1; j++)
      {
          let swapping = [] ; 
          swapping.push(j)
          swapping.push(j+1)
          if (arr[j] > arr[j+1])
          {
            swap(arr,j,j+1); 
          }
          await Delay(10)
          setarr_swap(swapping) ; 
          setarray(arr)
      }

      setarr_swap([]) ; 
    }
    
    console.log(array)
    Enable() ; 
  }

  async function Merge() 
  {
    Disable() ; 
    let curr_size
    let left_start
    let n = array.length

    for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) 
    {
        for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) 
        {
            let mid = Math.min(left_start + curr_size - 1, n - 1)
            let right_end = Math.min(left_start + 2 * curr_size - 1, n - 1)
            Merge_arrays(array, left_start, mid, right_end)
            await Delay(100) 
            setarray(array)
        }
        await Delay(100)
    }
    Enable() ; 
  }
  
  async function Merge_arrays(array , l , m , r) 
  {
    let i, j, k
    let n1 = m - l + 1
    let n2 = r - m
    let swap = []
    let L = Array(n1).fill(0)
    let R = Array(n2).fill(0)
    for (i = 0; i < n1; i++){L[i] = array[l + i]}    
    for (j = 0; j < n2; j++){R[j] = array[m + 1 + j]}
    i = 0
    j = 0
    k = l
    while (i < n1 && j < n2) 
    {
        swap.push(L[i])
        swap.push(R[j])
        if (L[i] <= R[j]) 
        {
          
            array[k] = L[i]
            i++
            swap.push(array[k])
            setarr_swap(swap)
            setarray(array)
        } 
        else 
        {
          
            array[k] = R[j]
            j++
            swap.push(array[k])
            setarr_swap(swap)
            setarray(array)
        }
        
        k++
    }
    await Delay(100)
    setarr_swap([])
    while (i < n1) 
    {
        array[k] = L[i]
        i++
        k++
        
        swap.push(array[k])
        setarr_swap(swap)
        setarray(array)
        
    }
    while (j < n2) 
    {
        array[k] = R[j]
        j++
        k++
        
        swap.push(array[k])
        setarr_swap(swap)
        setarray(array)
        
    }
    await Delay(100)
    setarr_swap([])
    await Delay(100)

  }
  
  function Partition(array, low, high)
  {
      let temp;
      let pivot = array[high];

      // index of smaller element
      let i = (low - 1);
      for (let j = low; j <= high - 1; j++) 
      {
          // If current element is smaller
          // than or equal to pivot
          if (array[j] <= pivot) 
          {
            i++;

            // swap arr[i] and arr[j]
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            setTimeout(100) ; 
            setarray(array)
          }
          setTimeout(100)
      }
      // swap arr[i+1] and arr[high]
      // (or pivot)

      temp = array[i + 1];
      array[i + 1] = array[high];
      array[high] = temp;

      setTimeout(100) ; 
      setarray(array)
      return i + 1;
  }

  async function Quick() 
  {
    Disable() ; 

    let l = 0 ; 
    let h = array.length-1 ; 
    // Create an auxiliary stack
    let stack = new Array(h - l + 1);
    stack.fill(0);

    // initialize top of stack
    let top = -1;

    // push initial values of l and h to
    // stack
    stack[++top] = l;
    stack[++top] = h;

    // Keep popping from stack while
    // is not empty
    while (top >= 0) 
    {
        let swapping = []
        // Pop h and l
        await Delay(100)
        swapping.push(h)        
        swapping.push(l)
        h = stack[top--];
        l = stack[top--];

        // Set pivot element at its
        // correct position in
        // sorted array
        await Delay(100)
        let p = Partition(array, l, h);
        swapping.push(p);
        setarr_swap(swapping)
        await Delay(100)
        setarr_swap([])

        // If there are elements on
        // left side of pivot, then
        // push left side to stack
        if (p - 1 > l) 
        {
            stack[++top] = l;
            stack[++top] = p - 1;
            await Delay(100)
            swapping.push(l) 
            swapping.push(p-1)
        }

        setarr_swap(swapping)
        await Delay(100)
        setarr_swap([])

        // If there are elements on
        // right side of pivot, then
        // push right side to stack
        if (p + 1 < h) 
        {
            stack[++top] = p + 1;
            stack[++top] = h;
            await Delay(100)
            swapping.push(p+1)
            swapping.push(h)
        }
        setarr_swap(swapping)
        await Delay(100) 
        setarray(array)  
    }
    await Delay(100)
    setarray(array)
    setarr_swap([])
    console.log(array)
    Enable() ; 

  }

    async function Shell() 
    {
      Disable() ; 
      var arr = array ; 
      var n = array.length ; 
    
      //Start with a really large gap, and then reduce the gap until there isn't any
      //With this, the gap starts as half of the array length, and then half of that every time
      for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2))
      {
        
        //Do a insertion sort for each of the section the gap ends up dividing
        for (let i = gap; i < n; i += 1)
        {
          //We store the current varible
          let swapping =[]
          swapping.push(i)
          let temp = arr[i];
          
          //This is the insection sort to sort the section into order
          let j;
          for ( j = i; j >= gap && arr[j-gap] > temp; j-=gap)
          {
            swapping.push(j-gap)
            arr[j] = arr[j-gap];
            
          }
          swapping.push(j)
          arr[j] = temp;
          
          setarr_swap(swapping) ; 
          await Delay(50)
          setarr_swap([])
          setarray(arr)
          
        }
        setarr_swap([])
      }
    
      console.log(arr) ; 
      Enable() ; 
    }

  return (
    <div className='heading'>
      <div >
        <h1>Sorting Visualiser</h1>
      </div>
      <form onSubmit={submitHandler} >
          <div className='array-size'>
            <input type='number' onChange={ArrayChangeHandler} value={enteredArray} placeholder={'Array Size'}/>
            <button type='submit' >Generate Array</button>
          </div>
      </form>
      <div className='sorts'>
        {buttons}
      </div>

      <div className="arrayContainer">
          {diagram}
      </div>
    </div>
  );
}

export default App;
