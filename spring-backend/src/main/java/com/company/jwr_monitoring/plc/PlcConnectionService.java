package com.company.jwr_monitoring.plc;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.plc4x.java.api.PlcConnection;
import org.apache.plc4x.java.api.PlcDriverManager;
import org.springframework.stereotype.Service;

import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlcConnectionService {
    private final PlcDriverManager plcDriverManager;
    private final Map<String, PlcConnection> connectionPool = new ConcurrentHashMap<>();

    public PlcConnection getConnection(String ip, Integer port) throws Exception {
        String key = ip + ":" + port;
        try {
            PlcConnection connection = connectionPool.get(key);
            if (connection == null || !connection.isConnected()) {
                synchronized (connectionPool) {
                    connection = connectionPool.get(key);
                    if (connection == null || !connection.isConnected()) {
                        String connectionString = "modbus-tcp://" + ip + ":" + port;
                        log.info("Connecting PLC [{}]", key);
                        connection = plcDriverManager
                                .getConnectionManager()
                                .getConnection(connectionString);
                        connectionPool.put(key, connection);
                        log.info("PLC Connected [{}]", key);
                    }
                }
            }
            return connection;
        } catch (Exception ex) {
            throw new RuntimeException("PLC " + key + " unreachable", ex);
        }
    }

    public void invalidateConnection(String ip, Integer port) {
        String key = ip + ":" + port;
        PlcConnection connection = connectionPool.remove(key);
        if (connection != null) {
            try {
                connection.close();
                log.warn("PLC Connection Removed [{}]", key);
            } catch (Exception ex) {
                log.error("Error closing PLC connection [{}]", key, ex);
            }
        }
    }

    public boolean isConnected(String ip, Integer port) {
        String key = ip + ":" + port;
        PlcConnection connection = connectionPool.get(key);
        return connection != null && connection.isConnected();
    }

    public int getActiveConnectionCount() {
        return connectionPool.size();
    }

    @PreDestroy
    public void closeAllConnections() {
        log.info("Closing PLC Connections...");
        connectionPool.forEach((key, connection) -> {
            try {
                connection.close();
                log.info("PLC Connection Closed [{}]", key);
            } catch (Exception ex) {
                log.error("Error closing PLC connection [{}]", key, ex);
            }
        });

        connectionPool.clear();

        log.info("All PLC Connections Closed");
    }
}