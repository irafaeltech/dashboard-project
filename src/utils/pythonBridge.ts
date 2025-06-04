export async function getPythonStats(): Promise<any> {
  try {
    const response = await fetch('/api/stats');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Python stats:', error);
    throw error;
  }
}