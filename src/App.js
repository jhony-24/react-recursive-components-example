import React from "react";
import "./styles.css";

function Tree({ data }) {
  return (
    <>
      {data.map((x, x1) => {
        const [ParentTag] = Object.getOwnPropertyNames(x);
        if (x[ParentTag]) {
          return (
            <ParentTag key={x1}>
              {x[ParentTag].map((y, y1) => {
                const [ChildTag] = Object.getOwnPropertyNames(y);
                const child = y[ChildTag];
                if (typeof child === "string") {
                  return <ChildTag key={y1}>{child}</ChildTag>;
                }
                if (typeof child === "function") {
                  const Component = child;
                  return <Component key={y1} />;
                }
                return <ChildTag key={y1}>{<Tree data={child} />}</ChildTag>;
              })}
            </ParentTag>
          );
        }
        return null;
      })}
    </>
  );
}

function MotionComponent({ children, username }) {
  return (
    <div>
      <strong>title</strong> <button>click me {username}</button>
      {children}
    </div>
  );
}

const data = [
  {
    ul: [
      {
        li: () => {
          return <MotionComponent username="developer" />;
        }
      },
      {
        li: MotionComponent
      }
    ]
  },
  {
    ul: [
      {
        li: [
          {
            ul: [
              {
                li: "a"
              },
              {
                li: "b"
              }
            ]
          }
        ]
      },
      {
        li: "end li"
      },
      {
        li: () => {
          return <input />;
        }
      }
    ]
  }
];

export default function App() {
  return (
    <div className="App">
      <Tree data={data} />
    </div>
  );
}
