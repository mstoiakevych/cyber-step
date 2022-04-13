FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y \
        nodejs \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g @angular/cli

WORKDIR /src
COPY ["GamingPlatform/GamingPlatform.csproj", "GamingPlatform/"]
RUN dotnet restore "GamingPlatform/GamingPlatform.csproj"
COPY . .

WORKDIR "/src/GamingPlatform/ClientApp"
RUN npm install && ng build --prod

WORKDIR "/src/GamingPlatform"
RUN dotnet build "GamingPlatform.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GamingPlatform.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GamingPlatform.dll"]
