interface IContentContainer {
  children: React.ReactNode;
}

const ContentContainer = ({ children }: IContentContainer) => {
  return <div className="contentContainer">{children}</div>;
};

export default ContentContainer;
