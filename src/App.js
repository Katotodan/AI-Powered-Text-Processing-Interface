import logo from './logo.svg';
import './App.css';

function App() {
  const check = async () =>{
    if ('ai' in window && 'summarizer' in window.ai) {
      // The Summarizer API is supported.
      console.log("Summarizer api is supported")
      const value = await window.ai.summarizer.capabilities()
      console.log(value);
    }else{
      console.log("Summarizer not supported");
      
    }
  }
  check()

  // Check if the API is available
  const summarizePage = async() => {
    if ('chromeSummary' in window) {
  // Function to handle summarization
  
    try {
      // Get the main content of the page
      const mainContent = `The Impact of Artificial Intelligence on the Job Market
                            Artificial Intelligence (AI) is transforming industries at an unprecedented pace. Automation, machine learning, and robotics are reshaping how businesses operate, improving efficiency but also raising concerns about job displacement. While AI can handle repetitive tasks with greater accuracy and speed, it also creates new opportunities for workers to engage in more strategic and creative roles.

                          Certain industries, such as manufacturing and customer service, have seen a significant reduction in human labor due to AI-driven automation. However, other fields, including data science, cybersecurity, and AI ethics, have experienced a surge in demand for skilled professionals. Rather than completely replacing jobs, AI is evolving the job market by requiring workers to upskill and adapt to new technologies.

                          To navigate these changes, governments and educational institutions are focusing on reskilling programs, ensuring that employees can transition into emerging roles. By fostering a culture of continuous learning, society can leverage AI’s potential while minimizing its disruptive effects on employment.`;
      
      // Request summary from Chrome
      const summary = await window.chromeSummary.generateSummary({
        text: mainContent,
        features: ['title', 'description', 'keyPoints']
      });
      
      // Display results
      console.log('Title:', summary.title);
      console.log('Description:', summary.description);
      console.log('Key Points:', summary.keyPoints);
      
      return summary;
    } catch (error) {
      console.error('Summarization failed:', error);
      throw error;
    }
    }else{
      console.log("Summarized not supported");
      
    }
  }
  // summarizePage()
  console.log(window);
  

  // Example test using Jest
  // describe('Page Summarization', () => {
  //   beforeEach(() => {
  //     // Mock Chrome Summary API
  //     global.window.chromeSummary = {
  //       generateSummary: jest.fn()
  //     };
      
  //     // Mock DOM content
  //     document.body.innerHTML = `
  //       <main>
  //         <h1>Article Title</h1>
  //         <p>This is a sample article with enough content to summarize.
  //         It contains multiple paragraphs and key information that
  //         should be captured in the summary.</p>
  //       </main>
  //     `;
  //   });

  //   test('should generate summary with all requested features', async () => {
  //     // Mock API response
  //     const mockSummary = {
  //       title: 'Sample Article Summary',
  //       description: 'A brief overview of the article content',
  //       keyPoints: ['Point 1', 'Point 2', 'Point 3']
  //     };

  //     window.chromeSummary.generateSummary.mockResolvedValue(mockSummary);

  //     const result = await summarizePage();

  //     expect(result).toEqual(mockSummary);
  //     expect(window.chromeSummary.generateSummary).toHaveBeenCalledWith({
  //       text: expect.any(String),
  //       features: ['title', 'description', 'keyPoints']
  //     });
  //   });

  //   test('should handle API errors', async () => {
  //     window.chromeSummary.generateSummary.mockRejectedValue(
  //       new Error('API Error')
  //     );

  //     await expect(summarizePage()).rejects.toThrow('API Error');
  //   });
  // });

  
  
  
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
