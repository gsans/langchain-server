## OpenAI
curl -X POST http://localhost:3000/predict \
   -H 'Content-Type: application/json' \
   -d '{"text":"What would be a good company name for a company that makes colorful socks?"}'

## PaLM2
curl -X POST http://localhost:3000/generateText \
   -H 'Content-Type: application/json' \
   -d '{"text":"What would be a good company name for a company that makes colorful socks?"}'

## VertexAI
curl -X POST http://localhost:3000/predictText \
   -H 'Content-Type: application/json' \
   -d '{"text":"What would be a good company name for a company that makes colorful socks?"}'