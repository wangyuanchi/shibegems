FROM golang:1.24-alpine
WORKDIR /pipeline

COPY go.mod go.sum ./
RUN go mod download
RUN go install github.com/pressly/goose/v3/cmd/goose@latest

COPY main.go ./
COPY pgdb ./pgdb
COPY rdb ./rdb
COPY utils ./utils
RUN CGO_ENABLED=0 GOOS=linux go build -o ./pipeline

COPY goose.sh ./
RUN chmod +x ./goose.sh

ENTRYPOINT ["sh", "-c", "./goose.sh && exec ./pipeline"]