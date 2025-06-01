import React from 'react';

export const AsciiArt = () => {
  return (
    <div className="w-full bg-black border-b border-green-600">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <pre className="font-mono text-green-400 text-sm whitespace-pre overflow-x-auto">
{`
    _    _       _    __     __    _____ _                 _ 
   | |  | |     | |   \\ \\   / /   / ____| |               | |
   | |__| | __ _| | __ \\ \\_/ /   | |    | | ___  _   _  __| |
   |  __  |/ _\` | |/ /  \\   /    | |____| |/ _ \\| | | |/ _\` |
   | |  | | (_| |   <    | |     |  _____| | (_) | |_| | (_| |
   |_|  |_|\\__,_|_|\\_\\   |_|     | |    |_|\\___/ \\__,_|\\__,_|
                                  |_|                         
`}
        </pre>
      </div>
    </div>
  );
}; 