const groupLines = (lines) => {
      const sections = Object.groupBy(lines, ({ locus }) => locus);
      return sections;
    };

export { groupLines };
