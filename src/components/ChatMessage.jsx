import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "https://esm.sh/remark-gfm";

// SVG Icons for Feedback
const ThumbsUpIcon = ({ selected }) => (
  <svg
    className={`w-5 h-5 ${selected ? "text-green-500" : "text-gray-400"}`}
    fill={selected ? "currentColor" : "none"}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.25m-1.75 1.5h-2.25a.75.75 0 01-.75-.75V8.25c0-.414.336-.75.75-.75h2.25a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75z"
    />
  </svg>
);
const ThumbsDownIcon = ({ selected }) => (
  <svg className={`w-5 h-5 ${selected ? 'text-red-500' : 'text-gray-400'}`} fill={selected ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.367 10.5c-.806 0-1.533.446-2.031 1.08a9.041 9.041 0 01-2.861 2.4c-.723.384-1.35.956-1.653-1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75-.75A2.25 2.25 0 0110.5 19.5c0-1.152-.26 2.243-.723-3.218.266-.558-.107-1.282-.725-1.282H7.374c-1.026 0-1.945-.694-2.054-1.715-.045-.422-.068-.85-.068-1.285a11.95 11.95 0 012.649-7.521c.388-.482.987-.729-1.605-.729H10.52c.483 0 .964.078 1.423.23l3.114 1.04a4.501 4.501 0 001.423.23h2.25m1.75-1.5h2.25a.75.75 0 01.75.75v7.5a.75.75 0 01-.75-.75V8.25a.75.75 0 01.75-.75z" />
  </svg>
);

const ThinkingIndicator = () => (
  <div className="flex items-center space-x-1.5 p-2">
    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"></div>
    <div
      className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"
      style={{ animationDelay: "0.2s" }}
    ></div>
    <div
      className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"
      style={{ animationDelay: "0.4s" }}
    ></div>
  </div>
);

const LinkCard = ({ href, children }) => {
    let displayHost = '';
    let linkTitle = children;

    try {
        const url = new URL(href);
        displayHost = url.hostname.replace(/^www\./, '');

        if (String(children).startsWith('http')) {
            const pathParts = url.pathname.split('/');
            const lastPart = pathParts[pathParts.length - 1];
            
            if (lastPart) {
                const slug = lastPart.split('.')[0];
                const formattedTitle = slug.replace(/--/g, ', ').replace(/-/g, ' ')
                                           .replace(/\b\w/g, l => l.toUpperCase());
                linkTitle = formattedTitle || 'Sumber Tautan';
            } else {
                linkTitle = 'Sumber Tautan';
            }
        }
    } catch (e) {
        displayHost = href;
        console.log(e)
    }

    return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-3 my-2 p-3 no-underline bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700/50"
        >
          <div className="flex-shrink-0 grid place-items-center w-8 h-8 rounded-md bg-gray-200 dark:bg-gray-700">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <span className="block font-semibold text-sm text-gray-800 dark:text-gray-200 truncate">
              {linkTitle}
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {displayHost}
            </p>
          </div>
        </a>
    );
};

const ChatMessage = ({ message, isLoading, onFeedback }) => {
  const isUser = message.sender === "user";
  const isAI = message.sender === "ai";

  const isThinking = isAI && !message.text && isLoading;
  const hasFeedback =
    message.feedbackGiven === "positive" ||
    message.feedbackGiven === "negative";

  return (
    <div
      className={`flex items-start gap-3 message-animation ${
        isUser ? "flex-row-reverse" : "flex-col sm:flex-row"
      }`}
    >
      <div
        className={`rounded-2xl p-4 shadow-sm border min-w-0 hover-lift
          ${
            isUser
              ? "bg-bps-light-blue border-blue-200 rounded-tr-md max-w-2xl"
              : "bg-white dark:bg-gray-700 border-gray-100 dark:border-gray-600 rounded-tl-md w-full"
          }`}
      >
        {isThinking ? (
          <ThinkingIndicator />
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:mt-0 prose-headings:mb-4 prose-p:my-2 [&_table]:my-0 [&>*:first-child]:mt-0">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                table: ({ ...props }) => (
                  <div className="overflow-x-auto -mt-2 rounded-lg border border-gray-200 dark:border-gray-700">
                    <table
                      {...props}
                      className="w-full text-sm border-collapse m-0"
                    />
                  </div>
                ),
                thead: ({ ...props }) => (
                  <thead {...props} className="bg-gray-50 dark:bg-gray-800" />
                ),
                th: ({ ...props }) => (
                  <th
                    {...props}
                    className="px-4 py-3 font-semibold text-left uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  />
                ),
                tbody: ({ ...props }) => (
                  <tbody
                    {...props}
                    className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600"
                  />
                ),
                tr: ({ ...props }) => (
                  <tr
                    {...props}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-600"
                  />
                ),
                td: ({ ...props }) => (
                  <td {...props} className="px-4 py-3 align-middle" />
                ),
                a: ({...props}) => <LinkCard href={props.href}>{props.children}</LinkCard>
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        )}
      </div>
      {/* {isAI && !isThinking && !isLoading && (
        <div className="flex items-center gap-1.5 self-start mt-2">
          <button
            onClick={() => onFeedback(message.id, "positive")}
            disabled={hasFeedback}
            className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            <ThumbsUpIcon selected={message.feedbackGiven === "positive"} />
          </button>
          <button
            onClick={() => onFeedback(message.id, "negative")}
            disabled={hasFeedback}
            className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            <ThumbsDownIcon selected={message.feedbackGiven === "negative"} />
          </button>
        </div>
      )} */}

      {isAI && !isThinking && (
        <div className="mt-2 sm:mt-0">
          <div className="flex items-center gap-1.5">
            {hasFeedback ? (
              <>
                <div className="flex flex-col items-center text-center">
                  {/* {feedbackGiven === "positive" && <ThumbsUpSolidIcon />}
                  {feedbackGiven === "negative" && <ThumbsDownSolidIcon />} */}

                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Feedback dikirim!
                  </div>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => onFeedback(message.id, "positive")}
                  className="p-1.5 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-green-500"
                  title="Good response"
                >
                  <ThumbsUpIcon />
                </button>
                <button
                  onClick={() => onFeedback(message.id, "negative")}
                  className="p-1.5 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-red-500"
                  title="Bad response"
                >
                  <ThumbsDownIcon />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
