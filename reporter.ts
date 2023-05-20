import {FullConfig, Reporter, Suite, TestCase, TestResult} from '@playwright/test/reporter'
import * as fs from 'fs'

class MyReporter implements Reporter {
    onBegin(suite, config) {
        console.log(`Execution of ${suite.allTests().length} tests`)
    }

    onEnd(result){
        console.log(`Execution finished with status of ${result.status}`);
    }
    onTestBegin(test) {
        console.log(`Executing of ${test.title} started`);
    }
    onTestEnd(test, result){
        const executionTime = result.duration
        const data = {
            text: test.title,
            status: result.status,
            execTime: executionTime,
            errors: result.errors
        }
        const dataToString = JSON.stringify(data,null, 2)
        console.log(dataToString);
        
        fs.writeFileSync("test-results.json",dataToString)
    }
}
export default MyReporter