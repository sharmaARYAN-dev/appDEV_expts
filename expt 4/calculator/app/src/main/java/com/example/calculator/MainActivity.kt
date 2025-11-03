package com.example.calculator

import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import net.objecthunter.exp4j.ExpressionBuilder

class MainActivity : AppCompatActivity() {

    private lateinit var textViewResult: TextView
    private var lastNumeric: Boolean = false
    private var stateError: Boolean = false
    private var lastDot: Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        textViewResult = findViewById(R.id.textViewResult)
    }

    fun onDigit(view: View) {
        if (stateError) {
            // If current state is Error, start a new expression
            textViewResult.text = (view as Button).text
            stateError = false
        } else {
            // If not, append the digit
            textViewResult.append((view as Button).text)
        }
        // Set the flag
        lastNumeric = true
    }

    fun onDecimalPoint(view: View) {
        if (lastNumeric && !stateError && !lastDot) {
            textViewResult.append(".")
            lastNumeric = false
            lastDot = true
        }
    }

    fun onOperator(view: View) {
        if (lastNumeric && !stateError) {
            textViewResult.append((view as Button).text)
            lastNumeric = false
            lastDot = false    // Reset the DOT flag
        }
    }

    fun onClear(view: View) {
        this.textViewResult.text = "0"
        lastNumeric = false
        stateError = false
        lastDot = false
    }

    fun onEquals(view: View) {
        // If the current state is error, nothing to do.
        // If the last input is a number only, solution can be found.
        if (lastNumeric && !stateError) {
            // Read the expression
            val txt = textViewResult.text.toString()
            // Create an Expression (A class from exp4j library)
            try {
                val expression = ExpressionBuilder(txt).build()
                val result = expression.evaluate()
                textViewResult.text = result.toString()
                lastDot = true // Result contains a dot
            } catch (ex: ArithmeticException) {
                // Display an error message
                textViewResult.text = "Error"
                stateError = true
                lastNumeric = false
            } catch (ex: Exception) {
                // Display a generic error message
                textViewResult.text = "Error"
                stateError = true
                lastNumeric = false
            }
        }
    }

    fun onBackspace(view: View) {
        if (textViewResult.text.isNotEmpty() && textViewResult.text.toString() != "0") {
            if (textViewResult.text.length == 1){
                textViewResult.text = "0"
            } else {
                textViewResult.text = textViewResult.text.substring(0, textViewResult.text.length - 1)
            }
            // Check the last character to update flags
            if (textViewResult.text.isNotEmpty()) {
                val lastChar = textViewResult.text.last()
                if (lastChar.isDigit()) {
                    lastNumeric = true
                    stateError = false // Reset error state on valid input
                } else if (lastChar == '.') {
                    lastNumeric = false
                    lastDot = true
                } else {
                    lastNumeric = false
                    lastDot = false
                }
            } else {
                 textViewResult.text = "0"
                 lastNumeric = false
                 lastDot = false
                 stateError = false
            }
        }
    }
}