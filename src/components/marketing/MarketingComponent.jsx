import marketing from '../../assets/marketing/download (1).png'
const MarketingComponent = () => {
  return (
    <div className="max-w-6xl my-10 mx-auto px-6 py-12 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
      {/* Left Text Section */}
      <div className="w-full md:w-1/2">
        <h6 className="text-sm text-gray-500 font-semibold uppercase">Marketing Solutions</h6>
        <h1 className="text-4xl font-bold text-gray-900 mt-2">Grow your business with marketing tools</h1>
        <p className="text-gray-600 mt-4">
        FlowMate invests in community engagement by fostering online communities through blogs, forums, and social media. 
        </p>
        <p className="text-gray-600 mt-4">
        They encourage users to share templates, workflows, and success stories, creating a sense of belonging and support around the brand.
        </p>
        <button className="mt-6 px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 hover:bg-[#0047ab] hover:text-white transition-all">
          View All Integrations
        </button>
      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-1/2 relative">
      <img
          src={marketing} 
          alt="Marketing"
          className="rounded-lg h-[550px]"
        />
        
       
      </div>
    </div>
  );
};

export default MarketingComponent;
