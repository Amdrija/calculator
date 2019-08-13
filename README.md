# Calculator
This is a simple calculator built with HTML, CSS and JavaScript.

## How it works
This calculator uses a simplified version of the [Shunting Yard Algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm) to evaluate expressions. The calculator is made exclusively with HTML, CSS and JavaScript with no framewroks involved.   
At first I was trying to come up with my own way to evaluate expressions by trying to find the first occurance of * or / and then from that position parsing left through the string to find the first operand and parsing right to find the second operand. When I had both operands and the operator * or /, I would evaluate that operation and then replace the operands and the operation in the string with the result of this operation. I would repeat this process until there were no * or / characters left.  
This solution looked too complicated and I thought there was a simpler solution for this problem, so I researched it and found the Shunting Yard Algorithm and implemented it in this calculator.