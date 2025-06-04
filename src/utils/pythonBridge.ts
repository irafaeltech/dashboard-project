export async function getPythonStats(): Promise<any> {
  try {
    const process = new Promise((resolve, reject) => {
      const { spawn } = require('child_process');
      const pythonProcess = spawn('python3', ['src/python/process_data.py']);
      
      let result = '';
      
      pythonProcess.stdout.on('data', (data: Buffer) => {
        result += data.toString();
      });
      
      pythonProcess.stderr.on('data', (data: Buffer) => {
        console.error(`Python Error: ${data}`);
      });
      
      pythonProcess.on('close', (code: number) => {
        if (code === 0) {
          try {
            const jsonResult = JSON.parse(result);
            resolve(jsonResult);
          } catch (e) {
            reject(new Error('Failed to parse Python output'));
          }
        } else {
          reject(new Error(`Python process exited with code ${code}`));
        }
      });
    });
    
    return await process;
  } catch (error) {
    console.error('Error executing Python script:', error);
    throw error;
  }
}