/* eslint-disable react/prop-types */
// 如果你在前端环境中（如 React、Vue 或其他前端框架）看到 process is not defined 错误，这是因为 process 是 Node.js 的全局对象，它在浏览器环境中不可用。
// 在前端项目中，要使用类似 process.env 访问环境变量，通常需要通过构建工具（如 Webpack、Vite 等）来注入环境变量。
// 解决方案：
// 1. 使用 Vite 处理环境变量
// 如果你使用的是 Vite，环境变量应该以 VITE_ 前缀开头，在前端可以通过 import.meta.env 来访问。
// 步骤：
// 创建 .env 文件：
// VITE_API_URL=https://api.example.com
// 在代码中使用 import.meta.env 访问变量：
// console.log(import.meta.env.VITE_API_URL);

// 2. 使用 Webpack 处理环境变量
// 如果你使用的是 Webpack，需使用 DefinePlugin 来定义环境变量。你可以在 Webpack 配置中将环境变量注入到前端。
// 步骤：
// 安装 Webpack 插件：
// npm install webpack --save-dev

// 在 webpack.config.js 文件中添加：
// const webpack = require('webpack');
// module.exports = {
//   plugins: [
//     new webpack.DefinePlugin({
//       'process.env.API_URL': JSON.stringify('https://api.example.com'),
//     }),
//   ],
// };

// 在代码中使用：
// console.log(process.env.API_URL);


import { useEffect, useState } from 'react';

// import { CohereClient } from "cohere-ai";


const Explain = ({ question, answers }) => {
    const [explainText, setExplainText] = useState("")
    const [loading, setLoading] = useState(true);

    const CohereApiKey = import.meta.env.VITE_COHERE_API_KEY;

    // const cohere = new CohereClient({
    //     token: CohereApiKey,  
    // });

    useEffect(() => {
        const explain = async () => {
            if (question && answers) {

                try {
                    const response = await fetch('https://api.cohere.ai/v1/chat', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${CohereApiKey}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            model: "command",
                            message: `The question is: ${question}.\nThe answers are: ${answers}. Please choose the correct answer and explain why.`,
                        }),
                    });

                    const data = await response.json();
                    setExplainText(data.text);

                    // //Cohere SDK（ Software Development Kit ） 可能依赖 process.env 来获取某些环境变量，而这些通常只在 Node.js 环境中存在。在浏览器环境中，process.env 是不可用的。Cohere SDK 可能默认期望从 process.env 读取配置，因此你需要确保手动传递 API 密钥，或者使用手动的 fetch 请求来避免这个问题。
                    // const chat = await cohere.chat({
                    //     model: "command",
                    //     message: `The question is: ${question}.\nThe answers are: ${answers}. Please choose the correct answer and explain why.`,
                    // });
                    // // console.log(chat.text);
                    // setExplainText(chat.text);
                } catch (error) {
                    console.error("Error explaining:", error);
                    setExplainText("Error explaining the answer.");
                } finally {
                    setLoading(false); // 完成加载
                }

            }

        };
        explain(); // 调用内部异步函数
    }, [question, answers]); // 当 question 或 answers 改变时运行 explain/ Run explain when question or answers change

    return (
        // style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f0f0', borderRadius: '8px' }}
        <div className='p-5 bg-[#f0f0f0] font-sans rounded-lg'>
            {loading ? (
                // 颜色填满的加载动画
                <div className="relative w-full h-6 bg-gray-200 rounded overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-blue-400 to-blue-600 animate-fill"></div>
                </div>
            ) : (
                <pre className="whitespace-pre-wrap overflow-x-auto text-gray-800 bg-white p-2.5 rounded-md border border-gray-300">
                    {explainText}
                </pre>
            )}
        </div>


    );
}

export default Explain;





