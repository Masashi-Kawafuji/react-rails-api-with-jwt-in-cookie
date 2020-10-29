FROM ruby:2.7.1


RUN apt-get update -qq && apt-get install -y build-essential libmariadb-dev vim

WORKDIR /usr/src/app

COPY Gemfile .
COPY Gemfile.lock .

RUN bundle install

COPY . .

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]


CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
