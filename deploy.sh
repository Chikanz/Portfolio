#!/bin/bash

pnpm run build
netlify deploy --prod --dir ./dist 