# Calculator
This is a simple calculator built with HTML, CSS and JavaScript. You can visit it at https://amdrija.github.io/calculator/

## How it works
This calculator uses a simplified version of the [Shunting Yard Algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm) to evaluate expressions. The calculator is made exclusively with HTML, CSS and JavaScript with no framewroks involved.  
There is keyboard support as well, however, the clear button is mapped with Shift + Backspace (Shift + Delete on macOS).   
At first I was trying to come up with my own way to evaluate expressions by trying to find the first occurance of * or / and then from that position parsing left through the string to find the first operand and parsing right to find the second operand. When I had both operands and the operator * or /, I would evaluate that operation and then replace the operands and the operation in the string with the result of this operation. I would repeat this process until there were no * or / characters left. Then I would just pass through the string from to evaluate + and - operations, since they have the same precedance I could just parse the string from left to right.  
This solution looked too complicated and I thought there was a simpler solution for this problem, so I researched it and found the Shunting Yard Algorithm and implemented it in this calculator.
