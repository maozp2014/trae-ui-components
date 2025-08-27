#!/bin/bash

# Rename all component JSX files to TSX
for component in SectionHeader StockItemCard MarketIndexTicker TradeIdeaCard StockDetailPanel; do
  if [ -f "src/components/$component/$component.jsx" ]; then
    mv "src/components/$component/$component.jsx" "src/components/$component/$component.tsx"
    echo "Renamed $component.jsx to $component.tsx"
  fi
  
  if [ -f "src/components/$component/$component.stories.jsx" ]; then
    mv "src/components/$component/$component.stories.jsx" "src/components/$component/$component.stories.tsx"
    echo "Renamed $component.stories.jsx to $component.stories.tsx"
  fi
  
done

# Update import statements in index.js
sed -i '' 's/\.jsx/\.tsx/g' src/components/index.js

echo "All files renamed successfully!"